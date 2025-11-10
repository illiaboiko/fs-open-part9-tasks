import { Patient, NonSensitivePatient } from "../types";
declare const _default: {
    getEntries: () => Patient[];
    getNonSensitiveEntries: () => NonSensitivePatient[];
    addPatient: (name: string, dateOfBirth: string, ssn: string, gender: string, occupation: string) => Patient;
    findById: (id: string) => NonSensitivePatient | undefined;
};
export default _default;
//# sourceMappingURL=patientService.d.ts.map