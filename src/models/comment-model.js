import { Schema, model } from "mongoose";

const CommentSchema = new Schema({
  authorID: { type: [Schema.Types.ObjectId], ref: "User" },
  title: { type: String },
  text: { type: String },
});

export default model("Comment", CommentSchema);
