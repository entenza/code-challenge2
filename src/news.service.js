
const axios = require('axios')

const { ERROR_FETCHING_FROM_API, ERROR_INSERTING_NEWS, ERROR_REMOVING_NEWS, ERROR_NEW_NOT_EXIST } = require('./errors');

const repo = require('./news.repository')


const url = 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs';

const fetchFromHackerNews = async () => {
  try {
    const { data } = await axios.get(url, {
      headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
    });

    return data.hits
  } catch (error) {
    
    console.log('====================================================');
    console.log('AXIOS ERROR ', error);
    console.log('====================================================');

    throw new Error(ERROR_FETCHING_FROM_API);
  }
}

const insertNews = (news) => {
  try {
    repo.storeNew(news);
  } catch (error) {

    throw new Error(ERROR_INSERTING_NEWS);
  }  
}

const process = async () => {

  const items = await fetchFromHackerNews()
  try {
    items.map((item) => insertNews(item));  
  } catch (error) {
    console.log('====================================================')
    console.log('ERROR ON STORING')
    console.log(error.message)
    console.log('====================================================')
  }
  
}


const getAll = async ({
  author = "",
  tag = "",
  title = "",
  month = "",
  page = 1,
  limit = 5,
}) => {

  const options = {
    deleted: null,
    ...(author && { author }),
    ...(tag && { tag }),
    ...(title && { title }),
    ...(month && {
      $expr: {
        $eq: [{ $month: "$created_at" }, numberOfMonth[month] || 1],
      },
    }),
  };

  let skip = 0;
  if (page > 0) skip = (page - 1) * limit;
  const items = await repo.findAll({
      options,
      skip,
      limit,
    })

  return {
    items,
    count: ( items).length
  };
};

const removeNewsByObjectId = async (objectID) => {
  try {

    const filter = { objectID, deleted : null };
    const update = { deleted: new Date() };
    return await repo.findOneAndUpdate(filter, update);    
    
  } catch (error) {
    throw Error(ERROR_REMOVING_NEWS);
  }
  
};

module.exports = {
  process,
  getAll,
  removeNewsByObjectId,
};