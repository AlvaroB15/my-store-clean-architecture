const express = require("express");
const routesApi = require("./routes");
const cors = require("cors");
const {errorHandler, logErrors, boomErrorHandler} = require("./middlewares/errorHandler");

const app = express();
const port = process.env.PORT || 3000;

const whiteList = ["http://localhost:3000", "https://myapp.com"];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("No permitido"));
    }
  }
};

//MIDDELWARES
app.use(express.json());
app.use(cors(options));

app.get("/api", (req, res) => {
  res.send("Hola mi server en express");
});

routesApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Server in port ", port);
});
