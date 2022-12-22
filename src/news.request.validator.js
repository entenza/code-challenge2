const { check } = require("express-validator");

const validMonths = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',  
]

const numberOfMonth = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
};

const validateMonth = async (req, res, next) => {
  const { month } = req.query
  if (month && !validMonths.includes(month)) {
    return res.status(400).send({
      error: true,
      message:
        "Month specified is invalid. Make sure it maches with one of the fallowings--> " +
        JSON.stringify(validMonths),
    });
  }
  next()
}


const validatePageAndLimit = async (req, res, next) => {
  const { page, limit } = req.query;
  
  let errors = {
    page: '',
    limit: ''
  }
  let haserror = false
  
  
  if ((page && isNaN(page)) || (page && !isNaN(page) && page <= 0)) {
    errors.page = "page query paramter is not well defined";
    haserror = true;
  }
  
  if ((limit && isNaN(limit)) || (limit && !isNaN(limit) && limit <= 0)) {
    errors["limit"] = "limit query paramter is not well defined";
    haserror = true;
  }
  if (haserror) {
    return res.status(400).send({
      error: true,
      message: errors,
    });
  }

  next()
}

const getNews = [
  validateMonth,
  validatePageAndLimit
]

module.exports = {
  getNews,

  numberOfMonth,
};