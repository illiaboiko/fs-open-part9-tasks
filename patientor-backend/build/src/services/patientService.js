"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const getEntries = () => {
    return patients_1.default;
};
const getNonSensitiveEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const findById = (id) => {
    const patient = patients_1.default.find((p) => p.id === id);
    return patient;
};
const addPatient = (entry) => {
    const newPatient = Object.assign({ id: crypto.randomUUID() }, entry);
    patients_1.default.push(newPatient);
    return newPatient;
};
exports.default = {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    findById,
};
//# sourceMappingURL=patientService.js.map