import { Patient, NonSensitivePatient, NewPatientEntry } from "../types";
declare const _default: {
    getEntries: () => Patient[];
    getNonSensitiveEntries: () => NonSensitivePatient[];
    addPatient: (entry: NewPatientEntry) => Patient;
    findById: (id: string) => NonSensitivePatient | undefined;
};
export default _default;
//# sourceMappingURL=patientService.d.ts.map