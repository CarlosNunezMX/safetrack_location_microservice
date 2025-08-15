import { Context } from "hono";
import { ContentfulStatusCode } from "hono/utils/http-status";
import { Env } from "../infrastructure/getSession";
import MakeHttpResponse from "../shared/httpResponse";

export class HttpError extends Error {
    constructor(
        public message: string,
        public code: ContentfulStatusCode
    ) {
        super(message);
    }
}

export function onError(err: Error, c: Context<Env, "/", any>) {
    console.error(err, c.req.path);
    let message: string = err.message;
    let code: ContentfulStatusCode;

    if (err instanceof HttpError) code = err.code;
    else code = 500;
    return MakeHttpResponse(c, message, code);
}