//Khoi dong may chu server: nodemon .\src\app.js -e js,hbs

const path = require("path");
const express = require("express");
const hbs = require("hbs"); // su dung npm hbs

//Yeu cau tu folder untils
const geocode = require("./untils/geocode");
const forecast = require("./untils/forecast");

/*
//In ra duong dan cua file thu muc
console.log(__dirname); //D:\Courses Online 2021\Node JS 2022\nodejs-course\web-server\src
// console.log(__filename);
console.log(path.join(__dirname, "../public"));
*/

const app = express();

//Duong dan tro den file index.html
const publicDirectoryPath = path.join(__dirname, "../public");

//Duong dan tro den folder templates/views
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Dong nay la su dung npm hbs
app.set("view engine", "hbs");

//Su dung folder templates
app.set("views", viewsPath);

hbs.registerPartials(partialsPath);

//localhost:3000 luc nay la file index.html
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", { title: "Weather App", name: "DinhNgocHai" });
}); //index la tro den index.hbs

app.get("/about", (req, res) => {
  res.render("about", { title: "About Page", name: "DinhNgocHai" });
}); //about la tro den about.hbs

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "DinhNgocHai",
    helpText: "How can I help you?",
  });
}); //help la tro den help.hbs

app.get("/products", (req, res) => {
  //Neu khong co search thi tra ve --> cac dong ben duoi trong khoi lenh se khong chay nua
  if (!req.query.search) {
    return res.send({ error: "You must provide a search term" });
  }

  console.log("Search=" + req.query.search); //in ra search tren duong dan

  //Neu co search tren duong dan
  res.send({ products: [] });
});

//Challenge 2
// app.get("/weather", (req, res) => {
//   //Khong co dia chi
//   if (!req.query.address) {
//     return res.send({ error: "You must provide an address" });
//   }

//   //Co dia chi
//   res.send([
//     {
//       forecast: { nhietdohomnay: 30, nhietdongaymai: 20 },
//       location: { thanhpho: "Hanoi", quocgia: "Vietnam" },
//       //Them vao dia chi
//       address: req.query.address,
//     },
//   ]);
// });

//In ra du lieu kieu JSON khi chay may chu server, vi du:http://localhost:3000/weather?address=Paris
app.get("/weather", (req, res) => {
  //Khong co dia chi
  if (!req.query.address) {
    return res.send({ error: "You must provide an address" });
  }

  //Co dia chi tinh
  // res.send([
  //   {
  //     forecast: { nhietdohomnay: 30, nhietdongaymai: 20 },
  //     location: { thanhpho: "Hanoi", quocgia: "Vietnam" },
  //     //Them vao dia chi
  //     address: req.query.address,
  //   },
  // ]);
  //Co dia chi dong
  geocode(
    req.query.address, //yeu cau dia chi
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error: error }); //gui ve loi dang JSON
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({error });
        }

        res.send({
          location: location, //Vi tri
          forecast: forecastData, //Thong tin thoi tiet
          address: req.query.address, //Them vao dia chi nhap
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "DinhNgocHai",
    errorMessage: "Help Aritcle Page Not Found",
  });
}); //404 la tro den 404.hbs

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "DinhNgocHai",
    errorMessage: "Page Not Found",
  });
}); //404 la tro den 404.hbs

// app.get("/help/*", (req, res) => {
//   res.send("My 404 Help Page");
// });

// app.get("", (req, res) => {
//   res.send("<h1>Home page!</h1>");
// });
// app.get("/help", (req, res) => {
//   res.send([{ name: "HaiDinh" }, { name: "DinhHai" }]);
// });

//Challange 1
// app.get("/about", (req, res) => {
//   res.send("<h1>About page</h1>");
// });

//nodemon :la de khoi dong lai may chu moi khi save
//Chay may chu 3000
app.listen(3000, () => {
  console.log("May chu 3000 da duoc khoi dong lai - Server is up on port 3000");
});
