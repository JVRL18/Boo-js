const mongoose = require("mongoose");

const User = new mongoose.Schema({
  id: { type: String, unique: true, required: true }
});

module.exports = {
  User: mongoose.model("User", User),
};
