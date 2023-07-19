'use strict';
const ptec_useright = require('../PTEC_DATA/ptec_useright');
const jwt = require('jsonwebtoken');
const config = process.env;

const user_login = async (req, res, next) => {
  try {
    const data_api = req.body;
    const response = await ptec_useright.STrack_Register_API(data_api)
    if (!response || response === 'Invalid Vendor_Code') {
      res.status(201).send("You are not membership");
    } else {
      const token = jwt.sign(data_api,
        process.env.TOKEN_KEY,
        {
          expiresIn: 60 * 24 // expires in 24 hours
        }
      )

      //save token
      data_api.token = token;

      res.status(200).json(data_api)
    }
  } catch (error) {
    res.status(201).send(error.message);
  }
}

const STrack_SuccessJob_From_API = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send("A token is required")
  } else {
    try {
      const decoded = jwt.verify(token, config.TOKEN_KEY);
      req.users = decoded;
      // Token
      const successJob = req.body;
      const response = await ptec_useright.STrack_SuccessJob_From_API(successJob)

    } catch (err) {
      return res.status(401).send("Invalid token")
    }
  }

  return next();
}

const STrack_UpdateStatus_From_API = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send("A token is required")
  } else {
    try {
      const decoded = jwt.verify(token, config.TOKEN_KEY);
      req.users = decoded;
      // Token
      const successJob = req.body;
      const response = await ptec_useright.STrack_UpdateStatus_From_API(successJob)

    } catch (err) {
      return res.status(401).send("Invalid token")
    }
  }

  return next();
}

module.exports = {
  user_login,
  STrack_SuccessJob_From_API,
  STrack_UpdateStatus_From_API
}