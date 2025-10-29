import express from "express";
import { BMICalculator } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
import { isNumber, isNumberArray } from "./helpers";

const app = express();

app.use(express.json())

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const mass = Number(req.query.weight);

  if (isNaN(height) || isNaN(mass)) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  const BMI = BMICalculator(height, mass);
  return res.json({ weight: mass, height: height, bmi: BMI });
});

interface ExerciseRequestBody {
  daily_exercises: unknown;
  target: unknown;
}

app.post("/exercises", (req, res) => {
  const body = req.body as ExerciseRequestBody;

  const hours = body.daily_exercises;
  const { target } = body;

  if (!hours || !target) {
    return res.status(400).json({
      error:
        "not enough parameters. specify daily_exercises as array of number (hours) and target hours as number",
    });
  }
  if (!isNumberArray(hours) || !isNumber(target)) {
    return res.status(400).json({
      error:
        "daily_exercises must be array of numbers and target should be a number",
    });
  }

  const result = calculateExercises(target, hours);
  return res.json({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
