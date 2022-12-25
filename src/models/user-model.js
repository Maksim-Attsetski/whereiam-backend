import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, unique: true, required: true },
  email: { type: String || Null },
  phoneNumber: { type: String || Null },
  avatar: { type: String },
  password: { type: String },
  isVerify: { type: Boolean, default: false },
  activationLink: { type: String },
  places: { type: [Schema.Types.ObjectId], ref: "Place" },
});

export default model("User", UserSchema);
