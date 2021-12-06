const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const app = express();
app.use(express.json());
require("dotenv").config({ path: "./config/.env" });
/* console.log(process.env.URL)
console.log(process.env.PORT) */
mongoose.connect(process.env.URL, (error) => {
  if (error) {
    console.log(error);
  }
  console.log("the database is connected successfully");
});
app.listen(process.env.PORT, () => {
  console.log(`the server is running on the port ${process.env.PORT}`);
});
app.get("/", (reques, response) => {
  User.find()
    .then((data) => {
      response.status(200).json({ users: data });
    })
    .catch((error) => {
      response.status(401).json({ error: error });
    });
});
app.post("/", (request, response) => {
  const user = request.body;
  const newuser = new User({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
  newuser
    .save()
    .then((data) => {
      response
        .status(200)
        .json({ message: "the user is registered", user: data });
    })
    .catch((error) => {
      response.status(401).json({ error: error });
    });
});
app.put("/:id", (request, response) => {
  const id = request.params.id;
  const user = request.body;
  User.findByIdAndUpdate(id, user, { new: true })
    .then((data) => {
      response.status(200).json({ message: "the user is updated", user: data });
    })
    .catch((error) => {
      console.log(error);
    });
});
app.delete("/:id", (request, response) => {
  const id = request.params.id;
  User.findByIdAndDelete(id)
    .then(() => {
      response.status(200).json({ message: "the user is succesfully deleted" });
    })
    .catch((error) => {
      response.status(400).json({ error });
    });
});
