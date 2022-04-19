function factorial(n) {
  let result = n || 1
  let i = 1

  while(i < n) {
    result *= i
    i++
  }

  return result
}
