const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({

  created_at: Date,

  title: String,
  
  url: String,
  
  author: String,
  
  points: String,

  story_text: String,

  comment_text: String,

  num_comments: Number,

  story_id: Number,
  
  story_title: String,

  story_url: String,

  parent_id: Number,

  created_at_i: Number,

  tags: String,

  objectID: String,
  
  deleted: Date,


});
const News = mongoose.model("news", newsSchema);

module.exports = News