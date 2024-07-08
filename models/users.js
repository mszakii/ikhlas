const mongoose = require("mongoose");

// Make a unique id that it's probability is 0.0002118%.
getUniqueId = () => Math.floor(Math.random() * 900000) + 100000;

const Schema = new mongoose.Schema({
  id: {
    type: String,
    default: () => getUniqueId(),
    index: { unique: true },
  },
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    default: "saleh",
  },
  regDate: {
    type: String,
    default: () => new Date(),
  },
});

const Users = mongoose.model("Users", Schema);

module.exports = Users;
