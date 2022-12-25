import { model, Schema } from "mongoose";

const PlaceSchema = new Schema({
  authorID: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  costPerPerson: { type: Number },
  images: { type: [String] },
  rating: [
    {
      authorID: { type: Schema.Types.ObjectId, ref: "User" },
      rate: { type: Number },
    },
  ],
  city: { type: String },
  likes: { type: [Schema.Types.ObjectId], ref: "User" },
  comments: { type: [Schema.Types.ObjectId], ref: "Comment" },
  savedIds: { type: [Schema.Types.ObjectId], ref: "User" },
  tags: { type: [String] },
  createdAt: { type: Number },
});

export default model("Place", PlaceSchema);
