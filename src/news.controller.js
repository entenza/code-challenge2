const service = require('./news.service')


const getNews = async (req, res, next) => {
  const {
    author,
    tag,
    title,
    month,
    page,
    limit,
  } = req.query;
  
  const criteria = {
    author,
    tag,
    title,
    month,
    page,
    limit,
  };

  return res.send(await service.getAll(criteria));
  
} 

const processNews = async (req, res, next) => {
  const items = await service.process()
  res.send({
    sucess : true,
    message: "Items News Succesfully Processed"
  });
};

const removeNews = async (req, res, next) => {
  try {
    const { objectId: id } = req.params;
    
    const removed = await service.removeNewsByObjectId(id);
    
    return res.status(200).send({
      success: true,
      message: "News succesfully removed",
      removed,
    });
    
  } catch (error) {
    return res.status(403).send({
      success: false,
      message: "There was an error removing the news",
      error : error.message,
    });    
  }
};

module.exports = {
  getNews,
  processNews,
  removeNews,
};