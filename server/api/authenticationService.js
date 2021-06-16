require('dotenv').config()
const jwt = require('jsonwebtoken')

const tokenHandler = process.env.TOKEN_HANDLER

const authenticationService =  (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];

       jwt.verify(token, tokenHandler, (err) => {
          if (err) {
              return res.sendStatus(403);
          }
          next();
      });
  } else {
      res.sendStatus(401);
  }
};
// AUTHORIZATION SERVICE ACTS AS MIDDLEWARE IN ALL PROTECTED ROUTES CHECKING AUTHORIZATION HEADER IN REQUEST FOR VALI JWT IN ORDER TO AUTHORIZE REQUEST.


module.exports = authenticationService