import { Gender, NewPatientEntry } from "./types";
import { z } from "zod";
export declare const newEntrySchema: z.ZodObject<{
    name: z.ZodString;
    dateOfBirth: z.ZodString;
    ssn: z.ZodString;
    gender: z.ZodEnum<typeof Gender>;
    occupation: z.ZodString;
}, z.core.$strip>;
declare const toNewPatientEntry: (object: unknown) => NewPatientEntry;
export default toNewPatientEntry;
//# sourceMappingURL=utils.d.ts.map