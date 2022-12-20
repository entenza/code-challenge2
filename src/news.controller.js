const service = require('./news.service')

const getNews = (req, res, next) => {
  return res.send("Hello from NEWS Controller")
} 

const processNews = async (req, res, next) => {
  const items = await service.process()
  res.send({
    sucess : true,
    message: "Items News Succesfully Processed"
  });
};

const removeNews = (req, res, next) => {
  throw new Error("removeNews method not implemented");
};

module.exports = {
  getNews,
  processNews,
  removeNews,
};