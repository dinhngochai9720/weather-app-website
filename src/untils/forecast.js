const request = require("postman-request");

//Viet 1 lan, su dung nhieu lan (Su dung callbackFunction)
const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=0b76b60660a99c05ad6082a7dae50e00&query=${latitude},${longitude}
        &units=m`;
  request({ url: url, json: true }, (error, { body }) => {
    //Khong co ket noi Internet
    if (error) {
      callback(
        "Khong co ket noi Internet -> Khong the cap nhat thoi tiet hien tai",
        undefined
      );
    }
    //url khong hop le
    else if (body.error) {
      callback("Dia chi khong hop le", undefined);
    }
    //Co ket noi Internet va url hop le
    else {
      callback(
        undefined,
        `It is currently ${body.current.temperature}*C. It feels like ${body.current.feelslike}*C, Mieu ta thoi tiet hien tai: ${body.current.weather_descriptions[0]}. Do am la: ${body.current.humidity}%. Chi so tia UV la: ${body.current.uv_index} `
      );
    }
  });

  //   const url =
  //     "http://api.weatherstack.com/current?access_key=0b76b60660a99c05ad6082a7dae50e00&query=" +
  //     latitude +
  //     "," +
  //     longitude +
  //     "&units=f";

  //   request({ url: url, json: true }, (error, { body }) => {
  //     if (error) {
  //       callback("Unable to connect to weather service!", undefined);
  //     } else if (body.error) {
  //       callback("Unable to find location", undefined);
  //     } else {
  //       callback(
  //         undefined,
  //         body.current.weather_descriptions[0] +
  //           ". It is currently " +
  //           body.current.temperature +
  //           " degress out."
  //       );
  //     }
  //   });
};

//Xuat ra de co the goi o nhung file khac
module.exports = forecast;
