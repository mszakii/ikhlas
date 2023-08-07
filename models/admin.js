const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("Admin", Schema);

module.exports = Admin;
