const mongoose = require("mongoose");

// const author = 'Pacifique Mbonimana';
const blogSchema = mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  intro: {
    type: String,
  },
  body: {
    type: String,
  },
  image: {
    type: String,
  },
  comments: [
    {
      names: String,
      timeadded: {
        type: Date,
      },
      comment: String,
    },
  ],
});

module.exports = mongoose.model("Blog", blogSchema);
// module.exports = mongoose.model("Comment",commentSchema)
