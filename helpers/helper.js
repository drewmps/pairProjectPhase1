const { default: ipLocation } = require("iplocation");
const qr = require("qrcode");
async function determineLocation(ipAddress) {
  try {
    if (ipAddress === "::ffff:127.0.0.1") {
      return "Jakarta";
    }
    if (ipAddress === "::1") {
      return "Jakarta";
    }

    if (
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        ipAddress
      )
    ) {
      let locationDetail = await ipLocation(ipAddress);
      return locationDetail.city;
    }
    return "Jakarta";
  } catch (error) {
    return "Jakarta";
  }
}
function qrGenerator() {
  let data = {
    name: "tes",
    email: "tes",
    gender: "tes",
  };
  let stJson = JSON.stringify(data);
  qr.toFile("qr.jpg", stJson, (err, code) => {
    if (err) {
      return console.log("error");
    }
  });
}
module.exports = {
  determineLocation,
  qrGenerator,
};
