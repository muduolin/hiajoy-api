export function isValidEmail(email: string) {
  const emailRegex = /^[a-zA-Z0-9._%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export function trimEndChar(str: string, charToTrim: string) {
  if (str.length === 0 || charToTrim.length === 0) {
    return str;
  }

  let lastIndex = str.length - 1;
  while (lastIndex >= 0 && str[lastIndex] === charToTrim) {
    lastIndex--;
  }
  return str.substring(0, lastIndex + 1);
}
