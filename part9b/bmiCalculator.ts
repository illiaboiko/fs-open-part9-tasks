interface BMINumbers {
  value1: number
  value2: number
}

const parseArguments = (args: string[]): BMINumbers => {
  if (args.length > 4) throw new Error('too many arguments')
  if (args.length < 4) throw new Error('not enough arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

const BMICalculator = (a: number, b: number) => {
  const mass = b
  const height = a / 100
  const BMI = mass / (height * height)
  console.log(BMI)

  if (BMI < 25) console.log('Normal range')
  if (BMI < 30) console.log('Overweigh range')
  if (BMI >= 30) console.log('Obese range')
}

try {
  const { value1, value2 } = parseArguments(process.argv)
  BMICalculator(value1, value2)
} catch (error: unknown) {
  let errorMessage = 'Smth bad happened'
  if (error instanceof Error) {
    errorMessage += 'Error: ' + error.message
  }
  console.log(errorMessage)
}
