function isEmpty(obj){
  let result = true

  for (key in obj) {
    result = false
  }

  return result
}
