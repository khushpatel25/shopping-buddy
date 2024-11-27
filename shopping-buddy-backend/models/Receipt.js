// models/receiptModel.js
const fs = require("fs");

exports.encodeImageToBase64 = (filePath) => {
  return fs.readFileSync(filePath, { encoding: "base64" });
};
