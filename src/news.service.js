
const axios = require('axios')

const { ERROR_FETCHING_FROM_API, ERROR_INSERTING_NEWS } = require('./errors');

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
  items.map((item) => insertNews(item));
}

module.exports = {
  process,
};