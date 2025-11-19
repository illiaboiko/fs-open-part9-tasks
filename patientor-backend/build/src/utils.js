"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newEntrySchema = exports.newPatientSchema = void 0;
const types_1 = require("./types");
const zod_1 = require("zod");
// patient schema
exports.newPatientSchema = zod_1.z.object({
    name: zod_1.z.string(),
    dateOfBirth: zod_1.z.iso.date(),
    ssn: zod_1.z.string(),
    gender: zod_1.z.enum(types_1.Gender),
    occupation: zod_1.z.string(),
});
// diagnosis schema
// const DiagnosisSchema = z.object({
//   code: z.string(),
//   name: z.string(),
//   latin: z.string().optional()
// });
// const DiagnosisArraySchema = z.array(DiagnosisSchema);
const baseEntry = {
    description: zod_1.z.string(),
    date: zod_1.z.iso.date(),
    specialist: zod_1.z.string(),
    diagnosisCodes: zod_1.z.array(zod_1.z.string())
};
exports.newEntrySchema = zod_1.z.discriminatedUnion("type", [
    zod_1.z.object(Object.assign(Object.assign({}, baseEntry), { type: zod_1.z.literal('Hospital'), discharge: zod_1.z.object({
            date: zod_1.z.iso.date(),
            criteria: zod_1.z.string()
        }) })),
    zod_1.z.object(Object.assign(Object.assign({}, baseEntry), { type: zod_1.z.literal('OccupationalHealthcare'), employerName: zod_1.z.string(), sickLeave: zod_1.z.object({
            startDate: zod_1.z.iso.date(),
            endDate: zod_1.z.iso.date()
        }) })),
    zod_1.z.object(Object.assign(Object.assign({}, baseEntry), { type: zod_1.z.literal('HealthCheck'), healthCheckRating: zod_1.z.enum(types_1.HealthCheckRating) }))
]);
const toNewPatientEntry = (object) => {
    return exports.newPatientSchema.parse(object);
};
exports.default = toNewPatientEntry;
//# sourceMappingURL=utils.js.map