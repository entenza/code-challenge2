const router = require('express').Router();
const ctrl = require('./news.controller')

/* GET users listing. */
router.get("/news", ctrl.getNews);
router.post("/news/process", ctrl.processNews);
router.delete("/news/", ctrl.removeNews);

module.exports = router;
