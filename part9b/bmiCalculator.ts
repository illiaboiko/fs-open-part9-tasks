interface BMINumbers {
  height: number
  mass: number
}

const parseArguments = (args: string[]): BMINumbers => {
  if (args.length > 4) throw new Error('too many arguments')
  if (args.length < 4) throw new Error('not enough arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      mass: Number(args[3]),
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

const BMICalculator = (height: number, mass: number): string => {
  const heightInM = height / 100
  const BMI = mass / (heightInM * heightInM)
  console.log(BMI)

  if (BMI < 25) return 'Normal range'
  if (BMI < 30) return 'Overweigh range'
  if (BMI >= 30) return 'Obese range'

  return 'Unknown range'
}
if (require.main === module) {
  try {
    const { height, mass } = parseArguments(process.argv)
    console.log(BMICalculator(height, mass))
  } catch (error: unknown) {
    let errorMessage = 'Smth bad happened'
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message
    }
    console.log(errorMessage)
  }
}

export { BMICalculator, parseArguments }
