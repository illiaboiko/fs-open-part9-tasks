import { z } from 'zod';
import { newEntrySchema } from './utils';
export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}
export declare enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}
export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}
export type NonSensitivePatient = Omit<Patient, "ssn">;
export type NewPatientEntry = z.infer<typeof newEntrySchema>;
//# sourceMappingURL=types.d.ts.map