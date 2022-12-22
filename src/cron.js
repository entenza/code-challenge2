const cron = require("node-cron");

const { 
   process
} = require('./news.service')

cron.schedule("*/15 * * * * *", async () => {
  process().then(() =>
    console.log(" ----------- news processed ---------------")
  );
});
