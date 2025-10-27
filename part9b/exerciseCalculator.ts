interface exerciseData {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (hours: number[], target: number) => {
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
  const totalDays = hours.length
  const trainingDays = hours.filter((d) => d > 0).length
  const averageDaily = hours.reduce((a, b) => a + b) / hours.length
  const { rating, description, success } = calculateRating(target, averageDaily)

  return {
    totalDays,
    trainingDays,
    success,
    rating,
    description,
    target,
    averageDaily,
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
