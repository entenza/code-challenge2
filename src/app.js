require("dotenv").config();
const express = require("express");
const cors = require("cors");

const newsRouter = require("./news.routes");
const { dbConnection } = require('./db')
require('./cron')

const app = express();
app.use(express.json());
app.use(cors());

app.use(newsRouter);
app.use('/', (req, res, next) => {
  res.status(200).send('Hello from CodeChallenge Express MongoDB!!! ')
})



const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')



dbConnection()
  .then(() => {
    console.log("DB CONNECTED!!");

    const port = process.env.SERVER_PORT || 3000;
    app.listen(port, () => console.log(`App listening on port ${port}`));

  })
  .catch((err) => console.log(err));

