function camelize(str) {
  const [firstSubStr, ...other] = str.split('-')
  const camelSubStr = other.map(([first, ...substr]) => {
    return (first.toUpperCase() + substr.join(''))
  }).join('')

  return firstSubStr + camelSubStr
}
