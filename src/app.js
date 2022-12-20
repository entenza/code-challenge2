require("dotenv").config();
const express = require("express");
const cors = require("cors");

const usersRouter = require("./news.routes");
const { dbConnection } = require('./db')

const app = express();
app.use(express.json());
app.use(cors());

app.use(usersRouter);

dbConnection()
  .then(() => {
    console.log("DB CONNECTED!!");

    const port = process.env.SERVER_PORT || 3000;
    app.listen(port, () => console.log(`App listening on port ${port}`));

  })
  .catch((err) => console.log(err));
