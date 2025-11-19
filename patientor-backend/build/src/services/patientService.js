"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const getEntries = () => {
    return patients_1.default;
};
const getNonSensitiveEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
    }));
};
const findById = (id) => {
    const patient = patients_1.default.find((p) => p.id === id);
    return patient;
};
const getNonSensitiveEntry = (id) => {
    const patient = patients_1.default.find((p) => p.id === id);
    if (!patient)
        return undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ssn } = patient, rest = __rest(patient, ["ssn"]);
    return rest;
};
const addPatient = (entry) => {
    const newPatient = Object.assign(Object.assign({ id: crypto.randomUUID() }, entry), { entries: [] });
    patients_1.default.push(newPatient);
    return newPatient;
};
const addEntry = (patientId, entry) => {
    const newEntry = Object.assign({ id: crypto.randomUUID() }, entry);
    const patientToUpdate = patients_1.default.find(p => p.id === patientId);
    patientToUpdate === null || patientToUpdate === void 0 ? void 0 : patientToUpdate.entries.push(newEntry);
    return newEntry;
};
exports.default = {
    getEntries,
    getNonSensitiveEntries,
    getNonSensitiveEntry,
    addPatient,
    findById,
    addEntry,
};
//# sourceMappingURL=patientService.js.map