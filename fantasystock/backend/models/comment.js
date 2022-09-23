const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const findorCreate = require("mongoose-findorcreate");

const User = require("./user"); // requiring user.js to be able to reference the user who is commenting

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId, // referencing the user for the comment
      ref: "User",
    },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    replies: {
      type: [Schema.Types.ObjectId],
      ref: this,
    },
  },
  { timestamps: true }
);

CommentSchema.plugin(findorCreate);

module.exports = mongoose.model("Comment", CommentSchema);
