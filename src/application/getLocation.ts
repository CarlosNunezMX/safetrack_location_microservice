import LocationRepo from "../domain/Location.repo";

export default class GetLocation {
    constructor(private readonly repo: LocationRepo) { }
    async execute(user_uuid: string) {
        const repo = await this.repo.retrive(user_uuid);
        return repo;
    }
}