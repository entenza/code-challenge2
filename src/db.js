
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const user = process.env.MONGO_DB_USER
const pass = process.env.MONGO_DB_PASS
const host = process.env.MONGO_HOST
const port = process.env.MONGO_PORT;
const db = process.env.MONGO_DB_NAME;

const uri = `mongodb://${user}:${pass}@${host}:${port}/${db}`;

const dbConnection = async () => {
  await mongoose.connect(uri);
}

// dbConnection()
//   .then(() => console.log("DB CONNECTED!!"))
//   .catch((err) => console.log(err));


module.exports = {
  dbConnection,
};