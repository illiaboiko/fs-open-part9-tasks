import express from 'express'
import { BMICalculator } from './bmiCalculator'
const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height)
  const mass = Number(req.query.weight)

  if (isNaN(height) || isNaN(mass)) {
    return res.status(400).json({
      error: 'malformatted parameters',
    })
  }

  const BMI = BMICalculator(height, mass)
  return res.json({ weight: mass, height: height, bmi: BMI })
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
