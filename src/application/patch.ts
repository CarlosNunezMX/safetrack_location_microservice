import Location, { Vector2 } from "../domain/Location";
import LocationRepo from "../domain/Location.repo";

export default class PatchLocation {
    constructor(
        private readonly repo: LocationRepo 
    ){}
    async execute(user_uuid: string, x: number, y: number) {
        const toDB = new Location(new Vector2(x, y), user_uuid)
        const res = await this.repo.update(toDB);
        return res;
    }
}