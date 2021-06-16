const express = require("express")
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")
const router = require("./api/mainRouter.js")
const cors = require("cors")

const dbpass = process.env.DB_PASS
const dbName = process.env.DB_NAME


// APPLIES MIDDLWARE.
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)


//MONGODB CONNECTION USING MONGOOSE LIBRARY API.
mongoose.connect(
  `mongodb+srv://Admin:${dbpass}@cluster-0.t7etm.mongodb.net/${dbName}?retryWrites=true&w=majority
`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

// SERVER INITIALIZATION.
app.listen(5000, () => {
  console.log("server started at port 5000")
})
