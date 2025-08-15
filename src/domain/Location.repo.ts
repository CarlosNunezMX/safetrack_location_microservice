import Location from "./Location";
import SavedLocation from "./SavedLocation";

export default interface LocationRepo {
    retrive(user_uuid: string): Promise<SavedLocation>;
    update(Location: Location): Promise<SavedLocation>;
    create(Location: Location): Promise<SavedLocation>;
};