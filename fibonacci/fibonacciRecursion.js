const fibonacciRecursion = number => {
  if (number <= 1) {
    return 0
  } else if (number === 2) {
    return 1
  } else {
    return fibonacciRecursion(number - 1) + fibonacciRecursion(number - 2)
  }
}

console.log(fibonacciRecursion(15))
