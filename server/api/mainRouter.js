const express = require("express")
const router = express.Router()
const Exchange = require("./models/Exchange.js")
const Admin = require("./models/Admin.js")
const jwt = require('jsonwebtoken')
const authenticationService = require("./authenticationService.js")
require("dotenv").config()
const tokenHandler = process.env.TOKEN_HANDLER


router.post('/auth/login', async (req, res) => {

  // FILTERS ADMIN COLLECTION BASED ON THE PARAMS GIVEN.
  //IF DOCUMENTS ARE FOUND RETURN THEM IN AN ARRAY.EMPTY ARRAY RESULTS IN FAILURE TO LOGIN.IF LOGIN SUCCEEDS RESPONDS WITH THE JWT.
   const admin = await Admin.find({
      username: req.body.username,
      password: req.body.password 
    })
    .exec();
  if (admin.length) {
      const token = jwt.sign({
        username: admin.username,
        password: admin.password
        }, tokenHandler );
      res.json({
          token
      }); 
    } else {
      res.send('Username or password incorrect.Access denied');
  }
});


//PERFORMS  EXCHANGE CALCULATION. RESPONDS WITH THE CALCULATION DETAILS AS WELL AS THE RESULT.
router.post('/calculate', (req, res) => {
  //TYPE VALIDATION.
  if (typeof req.body.amount === 'number' && typeof req.body.ratio === 'number' && typeof req.body.to === 'string' && typeof req.body.from === 'string') {
    const exchangeDetails = {
      from: req.body.from,
      to: req.body.to,
      ratio: req.body.ratio,
      amount: req.body.amount
    }
    const result = exchangeDetails.ratio * exchangeDetails.amount
    res.json({ ...exchangeDetails, result })
    console.log(result)
  } else {
    res.send('Invalid input type!')
  }
})


// GETS ALL EXCHANGE DOCUMENTS.
router.get("/exchanges", async (req, res) => {
  try {
    const allExchanges = await Exchange.find()
    res.json(allExchanges)
  } catch (err) {
    res.send({
      message: err,
    })
  }
})

//  CREATES SINGLE EXCHANGE WITH PARAMS GIVEN FROM REQUEST.RESPONDS WITH THE NEW EXCHANGE DOCUMENT.
router.post("/exchange/create",authenticationService,(req, res) => {
  const newExchange = new Exchange({
    from: req.body.from,
    to: req.body.to,
    ratio: req.body.ratio
  })
  newExchange
    .save()
    .then((data) => {
      res.json(data)
      console.log(data)
    })
    .catch((err) => {
      console.log(err)
      return
    })
})

// DELETES EXCHANGE BASED ON ID GIVEN FROM RESPONSE.
router.delete("/exchange/delete/:id",authenticationService, async (req, res) => {
   try {
    let id = req.params.id
    const removedExchange = await Exchange.findByIdAndDelete(id)
    res.json(removedExchange)
  } catch (err) {
    res.send({
      message: err,
    })
  }
})

// UPDATES EXCHANGE BASED ON ID.RESPONDS WITH THE NEW AND UPDATED DOCUMENT.
router.patch("/exchange/update/:id",authenticationService, async (req, res) => {
  try {
    let id = req.params.id
    const updatedExchange = await Exchange.findByIdAndUpdate(
      id,
      {
        $set: {
          to: req.body.to,
          from: req.body.from,
          ratio: req.body.ratio
        }
      },
      { new: true },
      (err, exchange) => {
        console.log(exchange)
      }
    )
    res.json(updatedExchange)
  } catch (err) {
    res.send({
      message: err,
    })
  }
})

module.exports = router
