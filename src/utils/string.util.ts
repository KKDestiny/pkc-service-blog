import dayjs from "dayjs";

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

export function generateSimplePasswd(length) {
  const text = ["abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "1234567890"];
  const rand = function (min, max) {
    return Math.floor(Math.max(min, Math.random() * (max + 1)));
  };
  const len = length;
  let pw = "";
  for (let i = 0; i < len; ++i) {
    var strpos = rand(0, 2);
    pw += text[strpos].charAt(rand(0, text[strpos].length));
  }
  return pw;
}

export function padStr(num: number | string, n: number) {
  const numString = String(num);
  let temp = numString;
  for (var i = 0; i < n - numString.length; i++) {
    temp = "0" + temp;
  }
  return temp;
}

export function getDeviceAgent(req) {
  var deviceAgent = req.headers["user-agent"].toLowerCase();
  var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
  if (agentID) {
    return "mobile"; // 手机、pad的网页
  } else {
    return "pc"; // 电脑端
  }
}

export function getDatetime() {
  return dayjs().format("YYYY-MM-DD HH:mm:ss");
}
