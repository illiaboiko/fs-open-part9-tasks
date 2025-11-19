import { Gender, HealthCheckRating, NewPatientEntry } from "./types";
import { z } from "zod";
export declare const newPatientSchema: z.ZodObject<{
    name: z.ZodString;
    dateOfBirth: z.ZodISODate;
    ssn: z.ZodString;
    gender: z.ZodEnum<typeof Gender>;
    occupation: z.ZodString;
}, z.core.$strip>;
export declare const newEntrySchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    type: z.ZodLiteral<"Hospital">;
    discharge: z.ZodObject<{
        date: z.ZodISODate;
        criteria: z.ZodString;
    }, z.core.$strip>;
    description: z.ZodString;
    date: z.ZodISODate;
    specialist: z.ZodString;
    diagnosisCodes: z.ZodArray<z.ZodString>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"OccupationalHealthcare">;
    employerName: z.ZodString;
    sickLeave: z.ZodObject<{
        startDate: z.ZodISODate;
        endDate: z.ZodISODate;
    }, z.core.$strip>;
    description: z.ZodString;
    date: z.ZodISODate;
    specialist: z.ZodString;
    diagnosisCodes: z.ZodArray<z.ZodString>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"HealthCheck">;
    healthCheckRating: z.ZodEnum<typeof HealthCheckRating>;
    description: z.ZodString;
    date: z.ZodISODate;
    specialist: z.ZodString;
    diagnosisCodes: z.ZodArray<z.ZodString>;
}, z.core.$strip>], "type">;
declare const toNewPatientEntry: (object: unknown) => NewPatientEntry;
export default toNewPatientEntry;
//# sourceMappingURL=utils.d.ts.map