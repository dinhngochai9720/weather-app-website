const request = require("postman-request");

//Viet 1 lan, su dung nhieu lan (Su dung callbackFunction)
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiaGFpZGluaCIsImEiOiJjbDI4bm9wdzUwOXU1M2RuNzRocDZwZnE2In0.4La8MQIqXZUk9SASJIvLgA";

  request({ url: url, json: true }, (error, { body }) => {
    //Khong co ket noi Internet
    if (error) {
      callback("Khong the ket noi dich vu vi tri", undefined);
    }
    //Khong tim thay vi tri
    else if (body.features.length === 0) {
      callback("Khong the tim thay vi tri! Vui long thu lai", undefined);
    }
    //Khong xay ra bat ky loi nao
    else {
      callback(undefined, {
        //Vi do
        latitude: body.features[0].center[1],
        //Kinh do
        longtitude: body.features[0].center[0],

        location: body.features[0].place_name,
      });
    }
  });
};

//Xuat ra de co the goi o nhung file khac
module.exports = geocode;
