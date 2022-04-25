function sumSalary(salaries) {
  let result = 0

  for (let key in salaries){
    let value = salaries[key]

    if (parseFloat(Number(value)) === value && isFinite(value)) {
      result += value
    }
  }

  return result
}
