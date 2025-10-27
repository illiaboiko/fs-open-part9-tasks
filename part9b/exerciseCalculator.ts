interface ExerciseAnalysis {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface ExerciseData {
  target: number
  hours: number[]
}

const parseArguments = (args: string[]): ExerciseData => {
  if (args.length < 5) {
    throw new Error(
      'Note enough arguments. Specify like so: target, [hour, hour...(at least 2 days)]'
    )
  }
  if (args.slice(2).every((element) => typeof Number(element) === "number")) {
    return {
      target: Number(args[2]),
      hours: args.slice(3).map((el) => Number(el)),
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

const calculateExercises = (
  target: number,
  hours: number[]
): ExerciseAnalysis => {
  interface Rating {
    rating: number
    description: string
    success: boolean
  }

  const calculateRating = (target: number, actual: number): Rating => {
    const ratingObj: Rating = {
      rating: 1,
      description: 'Needs improvement',
      success: false,
    }
    if (actual >= target) {
      ratingObj.rating = 3
      ratingObj.description = "Perfect! Keep doing, you're ahead of your target"
      ratingObj.success = true
    } else if (actual >= target * 0.8) {
      ratingObj.rating = 2
      ratingObj.description = 'Not bad!'
    }

    return ratingObj
  }
  const periodLength = hours.length
  const trainingDays = hours.filter((d) => d > 0).length
  const average = hours.reduce((a, b) => a + b) / hours.length
  const { rating, description, success } = calculateRating(target, average)

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription: description,
    target,
    average,
  }
}

try {
  const { target, hours } = parseArguments(process.argv)
  console.log(calculateExercises(target, hours))
} catch (error: unknown) {
  let errorMessage = 'Smth went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message
  }
  console.log(errorMessage)
}

export {}
