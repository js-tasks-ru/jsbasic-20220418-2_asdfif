function checkSpam(str) {
  const SPAM = ['1XBET', 'XXX']
  let formattedStr = str.toUpperCase()

  return !!SPAM.find(key => formattedStr.includes(key))
}
