const router = require('express').Router();
const ctrl = require('./news.controller')

const validator = require('./news.request.validator')

/* GET users listing. */
router.get("/news", validator.getNews, ctrl.getNews);
router.post("/news/process", ctrl.processNews);
router.delete("/news/:objectId", ctrl.removeNews);

module.exports = router;
