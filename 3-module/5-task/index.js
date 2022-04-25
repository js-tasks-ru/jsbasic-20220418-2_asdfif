function getMinMax(str) {
  const numbers = str.split(' ').filter(number => Number(number)).map(number => Number(number))

  return { min: Math.min(...numbers), max: Math.max(...numbers) }
}
