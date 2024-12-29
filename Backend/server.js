require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./utils/db");

const router = require('./Routes/auth-route');
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth",router);

const PORT = process.env.PORT;
db().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
});
  