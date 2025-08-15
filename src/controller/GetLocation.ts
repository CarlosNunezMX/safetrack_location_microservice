import { Context } from "hono";
import { Env } from "../infrastructure/getSession";
import GetLocation from "../application/getLocation";
import MakeHttpResponse from "../shared/httpResponse";

const GetLocationController = (action: GetLocation) =>
    async function (c: Context<Env>) {
        const user = c.get("user")!;
        const res = await action.execute(user.id);
        return MakeHttpResponse(c, res, 200);
    }
export default GetLocationController;