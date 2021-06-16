const mongoose = require("mongoose")

// SIMPLE MONGOOSE / MONGODB MODEL.
const ExchangeSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  ratio: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model("Exchanges", ExchangeSchema)
