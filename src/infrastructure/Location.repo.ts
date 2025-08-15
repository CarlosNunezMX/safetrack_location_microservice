import Location from "../domain/Location";
import LocationRepo from "../domain/Location.repo";
import SavedLocation from "../domain/SavedLocation";
import { HttpError } from "../errors/httpError";
import SupabaseConnection from "../supabase";
import LocationEncryption from "./Encrypt";

export default class LocationSupabaseRepo implements LocationRepo {
    constructor(
        private client: SupabaseConnection,
        private transformer: LocationEncryption
    ) { };


    async retrive(user_uuid: string): Promise<SavedLocation> {
        const response = await this.client.client.
            from("location")
            .select('*')
            .eq('user_uuid', user_uuid);


        if (!response.data || !response.data[0])
            throw new HttpError("No se encontró registros en DB", 404);

        return this.transformer.toClient(response.data[0]);
    }

    async update(Location: Location): Promise<SavedLocation> {
        const data = this.transformer.toDatabase(Location);
        const response = await this.client.client
            .from("location")
            .update({
                ...data,
                updated_at: new Date().toISOString()
            })
            .eq("user_uuid", Location.user_uuid)
            .select("*");

        if (response.error)
            throw new HttpError(response.error.message, 500);
        if (!response.data[0])
            return await this.create.bind(this)(Location);


        return this.transformer.toClient(response.data[0]);
    }


    async create(Location: Location): Promise<SavedLocation> {
        const data = this.transformer.toDatabase(Location);
        const res = await this.client.client.
            from("location")
            .insert(data)
            .select("*");


        if (res.error)
            throw new HttpError(res.error.message, 500);
        if (!res.data[0])
            throw new HttpError("No se pudo guardar la ubicación del usuario", 500);
        return this.transformer.toClient(res.data[0]);

    }
}