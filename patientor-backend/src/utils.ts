import { Gender, HealthCheckRating, NewPatientEntry,} from "./types";
import { z } from "zod";

// patient schema
export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

// diagnosis schema
// const DiagnosisSchema = z.object({
//   code: z.string(),
//   name: z.string(),
//   latin: z.string().optional()
// });

// const DiagnosisArraySchema = z.array(DiagnosisSchema);

const baseEntry = {
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string())
};

export const newEntrySchema = z.discriminatedUnion("type", [
  z.object({
    ...baseEntry,
    type: z.literal('Hospital'),
    discharge: z.object({
      date: z.iso.date(),
      criteria: z.string()
    })
  }),
  z.object({
    ...baseEntry,
    type: z.literal('OccupationalHealthcare'),
    employerName: z.string(),
    sickLeave: z.object({
      startDate: z.iso.date(),
      endDate: z.iso.date()
    }).optional()
    
  }),
  z.object({
    ...baseEntry,
    type: z.literal('HealthCheck'),
    healthCheckRating: z.enum(HealthCheckRating)
  })
]);

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return newPatientSchema.parse(object);
};

export default toNewPatientEntry;
