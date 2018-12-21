require("./RSA.js");
require("./BigInt.js");
require("./Barrett.js");

// 登录密码加密
export const encryptpassword = (password) => {
  setMaxDigits(130);
  let key = new RSAKeyPair('10001', '', 'b1ce915a21d373a31640728c7a1f00badfeb4f0884299e05a8f5c921e627c59bcedd94743a231182f387183aaa961943701ae1af732d7792156e89707d27b06b');
  return encryptedString(key, password);
}