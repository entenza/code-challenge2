const { ERROR_INSERTING_NEWS, ERROR_REMOVING_NEWS } = require("./errors");
const NewsModel = require("./news.model");
const { numberOfMonth } = require("./news.request.validator");

const storeNew = async (news) => {
  const existing = await NewsModel.findOne({
    objectID: news.objectID,
  });

  if (!existing) {

    const newsObj = new NewsModel({
      ...news,
      deleted : null,
    });
    newsObj.save(function (err) {
      if (err) throw new Error(ERROR_INSERTING_NEWS);
      else console.log('saved ', news.objectID)
    });

  }
};

const findAll = async ({
  options,
  skip,
  limit
}) => {

  return await NewsModel.find(options).skip(skip).limit(limit).exec();
   
}

const findOne = async (options) => {
  return await NewsModel.findOne(options).exec();
};

const findOneAndUpdate = async (filter, update) => {
  
  return await NewsModel.findOneAndUpdate(filter, update);

};



module.exports = {
  storeNew,
  findAll,
  findOne,
  findOneAndUpdate,
};