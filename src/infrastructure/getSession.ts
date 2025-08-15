import { Context } from "hono";
import SupabaseConnection from "../supabase";
import { createMiddleware } from "hono/factory";
import { HttpError } from "../errors/httpError";
import { UserResponse } from "@supabase/supabase-js";

export interface Env {
    Variables: {
        user: UserResponse["data"]["user"]
    }
}

export default ({client}: SupabaseConnection) => createMiddleware<Env>(async (c, next) => {
    const header = c.req.header("Authorization");
    if(!header)
        throw new HttpError("No autorizado", 401);

    const token = header.split(" ")[1];
    if(!token)
        throw new HttpError("No se envio un token", 400);
    
    const user = await client.auth.getUser(token);
    if(!user.data.user || user.error)
        throw new HttpError("Sesión invalida", 401);
    c.set("user", user.data.user!);

    await next();
}) 