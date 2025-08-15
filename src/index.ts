import { Hono } from 'hono'
import { GetLocationCase, PatchLocationCase} from './server'
import getSession from './infrastructure/getSession'
import infrastructure from './infrastructure'
import GetLocationController from './controller/GetLocation'
import { onError } from './errors/httpError'
import { zValidator } from '@hono/zod-validator'
import LocationValidator from './validators/GetLocation'
import PatchLocationController from './controller/PatchLocation'

const app = new Hono()
  .use("*", getSession(infrastructure.client))
  .get("/", GetLocationController(GetLocationCase))
  .patch("/", zValidator("json", LocationValidator), PatchLocationController(PatchLocationCase))
  .onError(onError);

export default app
