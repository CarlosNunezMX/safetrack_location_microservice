import GetLocation from "../application/getLocation";
import PatchLocation from "../application/patch";
import Infrastructure from "../infrastructure/index"

export const GetLocationCase = new GetLocation(Infrastructure.locationRepo);
export const PatchLocationCase = new PatchLocation(Infrastructure.locationRepo);