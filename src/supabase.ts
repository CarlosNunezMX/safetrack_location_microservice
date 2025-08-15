import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./supabase_types";

export default class SupabaseConnection {
    readonly client: SupabaseClient<Database>;
    constructor(
        private url: string,
        private key: string
    ) {
        this.client = createClient<Database>(
            url,
            key,
            { auth: { persistSession: false } }
        );
    }
}
