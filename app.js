const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/record");
var mongoose = require("mongoose");

const app = express();
const DB_USER_NAME = process.env.DB_USER_NAME;
const DB_USER_PASSWORD = process.env.DB_USER_PASSWORD;
const DEV_DB_URL = "mongodb://localhost/tic-tac-toe";
const PROD_DB_URL = `mongodb+srv://${DB_USER_NAME}:${DB_USER_PASSWORD}@cluster0-z1tm1.mongodb.net/tic-tac-toe?retryWrites=true&w=majority`;
const mongoDB =
  process.env.NODE_ENV === "production" ? PROD_DB_URL : DEV_DB_URL;
const PORT = process.env.PORT || 3000;

mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .catch(error => console.log("error:" + error));
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.once("open", function callback() {
  console.log("Connected to MongoDB");
});
db.on("error", err => {
  console.log("error:" + err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
};

app.use(allowCrossDomain);
app.use("/tic-tac-toe", route);

app.listen(PORT, () => {
  console.log("Server is up and running on port number " + PORT);
});
