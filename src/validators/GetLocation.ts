import z from "zod";

const LocationValidator = z.object({
    x: z.number(),
    y: z.number()
});

export default LocationValidator 