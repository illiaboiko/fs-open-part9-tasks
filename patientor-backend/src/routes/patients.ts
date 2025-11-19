import express, { NextFunction } from "express";
import patientService from "../services/patientService";
import { Request, Response } from "express";
import {
  NewEntryWithoutId,
  NewPatientEntry,
  NonSensitivePatient,
  Patient,
} from "../types";
import { newEntrySchema, newPatientSchema } from "../utils";
import { z } from "zod";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  const patient = patientService.getNonSensitiveEntry(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  }
);

router.post(
  "/:id/entries",
  newEntryParser,
  (req: Request<{ id: string }, unknown, NewEntryWithoutId>, res) => {
    const patient = patientService.getNonSensitiveEntry(req.params.id);
    if (patient) {
      const addedEntry = patientService.addEntry(req.params.id, req.body);
      res.json(addedEntry);
    } else {
      res.sendStatus(404);
    }
  }
);

router.use(errorMiddleware);

export default router;
