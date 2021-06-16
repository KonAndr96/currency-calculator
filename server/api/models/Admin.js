const mongoose = require("mongoose")

// SIMPLE MONGOOSE / MONGODB MODEL.
const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model("Admins", AdminSchema)