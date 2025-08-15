import Location from "./Location";

export default class SavedLocation extends Location {
    constructor(
        location: Location,
        public id: string,
        public created_at: Date,
        public updated_at: Date
    ){
        super(location.location, location.user_uuid);
    };
}