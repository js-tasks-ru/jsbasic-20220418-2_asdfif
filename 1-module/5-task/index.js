function truncate(str, maxlength) {
  const END = '…'
  let result = str

  if (str.length > maxlength) {
     result = str.slice(0, (maxlength - 1)) + END
  }

  return result
}
