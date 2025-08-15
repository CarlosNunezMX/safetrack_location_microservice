import { ContentfulStatusCode } from "hono/utils/http-status";

export class HttpError extends Error {
    constructor(
        public message: string,
        public code: ContentfulStatusCode
    ) {
        super(message);
    }
}