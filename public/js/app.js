console.log("Client side JavaScript file is loaded!");

// const http = fetch("http://puzzle.mead.io/puzzle");
// http.then((response) => {
//   response.json().then((data) => {
//     // console.log(data);
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = search.value; //Lay gia tri ng dung nhap vao
  //   console.log(location);

  messageOne.textContent = "Loading........";
  messageTwo.textContent = "";

  const httpWeather = fetch(
    `http://localhost:3000/weather?address=${location}`
  );

  httpWeather.then((response) => {
    response.json().then((data) => {
      if (data.error) {
        // console.log(data.error);
        messageOne.textContent = data.error;
      } else {
        //   console.log(`Vi tri la: ${data.location}`); //In ra vi tri
        messageOne.textContent = `Vi tri: ${data.location}`;

        //   console.log(
        //     `Thong tin thoi tiet: ${data.forecast.currently}, ${data.forecast.description}`
        //   ); // In ra thong tin thoi tiet
        messageTwo.textContent = `Thong tin thoi tiet: ${data.forecast}`;
      }
    });
  });

  //   console.log("runninggggg");
});
