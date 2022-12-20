const { ERROR_INSERTING_NEWS } = require("./errors");
const NewsModel = require("./news.model");

const storeNew = async (news) => {
  const existing = await NewsModel.findOne({
    objectID: news.objectID,
  });

  if (!existing) {

    const newsObj = new NewsModel(news);
    newsObj.save(function (err) {
      if (err) throw new Error(ERROR_INSERTING_NEWS);
      else console.log('saved ', news.objectID)
    });

    // NewsModel.create(news, function (err, small) {
    //   if (err) throw new Error(ERROR_INSERTING_NEWS);
    //   else console.log("SAVED -> ", news);
    // });

  }
};

module.exports = {
  storeNew,
};