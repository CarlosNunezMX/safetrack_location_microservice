import { Context } from "hono";
import { Env } from "../infrastructure/getSession";
import GetLocation from "../application/getLocation";

const GetLocationController = (action: GetLocation) =>
    async function (c: Context<Env>) {
        const user = c.get("user")!;
        const res = await action.execute(user.id);
        return c.json({
            ok: true,
            response: res
        });
    }
export default GetLocationController;