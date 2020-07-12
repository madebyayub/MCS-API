const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  userID: String,
  prevState: Object,
});

module.exports = mongoose.model("User", userSchema);
