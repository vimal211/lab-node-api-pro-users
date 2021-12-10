const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number },
    prograd_id: { type: Number },
    squad: { type: Number },
  },
  { collection: "users" }
);

const userSc = mongoose.model("userSc", userSchema);

module.exports = userSc;
