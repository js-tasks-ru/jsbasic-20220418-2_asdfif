function sumSalary(salaries) {
  result = 0

  for (key in salaries){
    value = salaries[key]

    if (parseFloat(Number(value)) === value && isFinite(value)) {
      result += value
    }
  }

  return result
}
