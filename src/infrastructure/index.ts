import LocationRepo from "../domain/Location.repo";
import SupabaseConnection from "../supabase";
import LocationEncryption from "./Encrypt";
import LocationSupabaseRepo from "./Location.repo";
import {env} from "cloudflare:workers"

class Constants {
    private readonly SupabaseKey: string;
    private readonly SupabaseUrl: string;
    private readonly LocationKey: string;
    readonly client: SupabaseConnection;
    private readonly transformer: LocationEncryption; 
    public readonly locationRepo: LocationRepo;
    constructor() {
        const { SUPABASE_URL, SUPABASE_KEY, LOCATION_KEY } = env;
        if (!SUPABASE_KEY || !SUPABASE_URL)
            throw "Set SUPABASE_KEY and SUPABASE_URL before start project!";
        if(!LOCATION_KEY)
            throw "Set location encryption key before!";
        this.LocationKey = LOCATION_KEY;
        this.SupabaseKey = SUPABASE_KEY;
        this.SupabaseUrl = SUPABASE_URL;

        this.client = new SupabaseConnection(this.SupabaseUrl, this.SupabaseKey);
        this.transformer = new LocationEncryption(this.LocationKey);
        this.locationRepo = new LocationSupabaseRepo(this.client, this.transformer);
    }
};

export default new Constants();