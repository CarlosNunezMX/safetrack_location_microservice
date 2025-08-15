import { randomBytes, createCipheriv, createDecipheriv, scryptSync } from "crypto";
import Location, { Vector2 } from "../domain/Location";
import SavedLocation from "../domain/SavedLocation";
import { Database } from "../supabase_types";

export type DatabaseLocation = Database["public"]["Tables"]["location"];
type SaveLocation = Omit<DatabaseLocation["Insert"], "created_at" | "updated_at"  | "id">

export default class LocationEncryption {
    private key: Buffer;
    constructor(key: string) {
        this.key = scryptSync(key, "salt", 32);
    };
    toDatabase(location: Location): SaveLocation{
        const iv = randomBytes(16);
        const cipher = createCipheriv("aes-256-gcm", this.key, iv);
        let encrypted = cipher
            .update(`${location.location.x},${location.location.y}`, "utf-8", "hex");
        encrypted += cipher.final();
        const tag = cipher.getAuthTag();


        return {
            encriptedLocation: encrypted,
            iv: iv.toString("hex"),
            tag: tag.toString("hex"),
            user_uuid: location.user_uuid
        }
    }

    toClient(dto: DatabaseLocation["Row"]): SavedLocation {
        const decipher = createDecipheriv("aes-256-gcm",
            this.key,
            Buffer.from(dto.iv, "hex"),
        );

        decipher.setAuthTag(Buffer.from(dto.tag, "hex"));


        let decrypted = decipher.update(dto.encriptedLocation, "hex", "utf-8");
        decrypted += decipher.final("utf-8");

        const [x_str, y_str] = decrypted.split(",");
        const x = parseFloat(x_str),
            y = parseFloat(y_str); 
        return new SavedLocation(
            new Location(
                new Vector2(x, y),
                dto.user_uuid
            ),
            dto.id,
            new Date(dto.created_at),
            new Date(dto.updated_at)
        )    
    }
};