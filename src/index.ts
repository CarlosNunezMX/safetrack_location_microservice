import { Hono } from 'hono'
import { GetLocationCase, PatchLocationCase} from './server'
import getSession from './infrastructure/getSession'
import infrastructure from './infrastructure'
import GetLocationController from './controller/GetLocation'
import { HttpError } from './errors/httpError'
import { zValidator } from '@hono/zod-validator'
import LocationValidator from './validators/GetLocation'
import PatchLocationController from './controller/PatchLocation'

const app = new Hono()
  .use("*", getSession(infrastructure.client))
  .get("/", GetLocationController(GetLocationCase))
  .patch("/", zValidator("json", LocationValidator), PatchLocationController(PatchLocationCase))
  .onError((err, c) => {
    console.error("Error", err)
    if(!(err instanceof HttpError)){
      return c.json({ok: false, resposne: "Un error ha ocurrido"}, 500)
    }

    return c.json({
      ok: false,
      response: err.message
    }, err.code)
  })


export default app
