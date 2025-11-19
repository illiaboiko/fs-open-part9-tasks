import { Patient, NonSensitivePatient, NewPatientEntry, NewEntryWithoutId, Entry } from "../types";
declare const _default: {
    getEntries: () => Patient[];
    getNonSensitiveEntries: () => NonSensitivePatient[];
    getNonSensitiveEntry: (id: string) => NonSensitivePatient | undefined;
    addPatient: (entry: NewPatientEntry) => Patient;
    findById: (id: string) => NonSensitivePatient | undefined;
    addEntry: (patientId: string, entry: NewEntryWithoutId) => Entry;
};
export default _default;
//# sourceMappingURL=patientService.d.ts.map