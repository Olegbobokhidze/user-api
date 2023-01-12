import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import { UserModel } from "./model/users.js";
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
mongoose.connect(process.env.MONGO_URL);
app.get("/getUsers", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete(id, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Item deleted successfully");
    }
  });
});
app.put("/:id", (req, res) => {
  UserModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((user) => {
      res.json(user);
      console.log(user?.id);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
app.post("/createUser", async (req, res) => {
  const user = req.body;
  console.log(user);
  const newUser = new UserModel(user);
  await newUser.save();
  res.json(user);
});
app.listen(process.env.PORT, () => {
  console.log("app listening on port 3010");
});
