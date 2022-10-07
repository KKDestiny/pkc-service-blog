export function generateSerial() {
  const dateObj = new Date();
  const serialPrevfix =
    dateObj.getFullYear() +
    padStr(dateObj.getMonth() + 1, 2) +
    padStr(dateObj.getDate(), 2) +
    padStr(dateObj.getHours(), 2) +
    padStr(dateObj.getMinutes(), 2) +
    padStr(dateObj.getSeconds(), 2);
  return serialPrevfix + parseInt(`${10000 * Math.random()}`, 10);
}

export function padStr(num: number | string, n: number) {
  const numString = String(num);
  let temp = numString;
  for (var i = 0; i < n - numString.length; i++) {
    temp = "0" + temp;
  }
  return temp;
}
