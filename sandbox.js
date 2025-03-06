const qr = require("qrcode");
let data = {
  name: "tes",
  email: "tes",
  gender: "tes",
};
let stJson = JSON.stringify(data);
qr.toDataURL(stJson, (err, code) => {
  if (err) {
    return console.log("error");
  }
  console.log(code);
});
