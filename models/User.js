const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  userID: String,
  prevState: String,
});

module.exports = mongoose.model("User", userSchema);
