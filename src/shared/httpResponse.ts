import { Context } from "hono";
import { ContentfulStatusCode } from "hono/utils/http-status";

export default function MakeHttpResponse<T>(c: Context, body: T, code: ContentfulStatusCode) {
    return c.json({ 
        ok: code === 200,
        response: body
    }, code);
}