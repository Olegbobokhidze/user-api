import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
});
export const UserModel = mongoose.model("users", UsersSchema);
