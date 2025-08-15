import { Context } from "hono";
import { Env } from "../infrastructure/getSession";
import PatchLocation from "../application/patch";
interface Validation {
    in: {
        json: {
            x: number;
            y: number;
        };
    };
    out: {
        json: {
            x: number;
            y: number;
        };
    };
}

const PatchLocationController = (action: PatchLocation) =>
    async function (c: Context<Env, "/", Validation>) {
        const user = c.get("user")!;
        const body = c.req.valid("json")!;
        const res = await action.execute(user.id, body.x, body.y);
        return c.json({
            ok: true,
            response: res
        });
    }

export default PatchLocationController;