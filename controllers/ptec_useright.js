"use strict";
const ptec_ops = require("../PTEC_DATA/ptec_ops");
const jwt = require("jsonwebtoken");
const config = process.env;
config.TZ= "Asia/Bangkok";

const register = async (req, res, next) => {
  try {
    const data_api = req.body;
    if (
      !data_api.vendor_code ||
      !data_api.email ||
      !data_api.tel ||
      !data_api.taxid
    ) {
      return res.status(400).send("input is requried!");
    }

    const olduser = await ptec_ops.STrack_API_CheckUserExists(data_api);
    if (olduser.length > 0) {
      return res.status(409).send("Please login");
    }
    const response = await ptec_ops.STrack_API_Register(data_api);
    const token = jwt.sign(data_api, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });

    //save token
    data_api.token = token;

    return res.status(201).json(data_api);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const user_login = async (req, res, next) => {
  try {
    const data_api = req.body;
    console.log(data_api);
    if (
      !data_api.vendor_code ||
      !data_api.taxid
    ) {
      return res.status(400).send("input is requried!");
    }

    const olduser = await ptec_ops.STrack_API_CheckUserExists(data_api);
    console.log(olduser.length);
    if (olduser.length > 0) {
      const token = jwt.sign(data_api, process.env.TOKEN_KEY, {
        expiresIn: "2h",
      });
      
      // console.log('in2');
      data_api.token = token;

      res.status(201).json(data_api);
    }else{
        return res.status(400).send("Invalid Credentials");
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const STrack_API_SuccessJob_From = async (req, res, next) => {
  try {
    const data_api = req.body;
    console.log(data_api);
    if (
      !data_api.opscode ||
      !data_api.begindate||
      !data_api.enddate||
      !data_api.detail||
      !data_api.taxid
    ) {
      return res.status(400).send("input is requried!");
    }
    console.log(data_api.begindate);
    console.log(data_api.enddate);
    const response = await ptec_ops.STrack_API_SuccessJob_From(data_api);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const STrack_API_UpdateStatus_From = async (req, res, next) => {
  try {
    const data_api = req.body;
    if (
      !data_api.opscode ||
      !data_api.order||
      !data_api.stepid||
      !data_api.taxid
    ) {
      return res.status(400).send("input is requried!");
    }
    const response = await ptec_ops.STrack_API_UpdateStatus_From(data_api);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {
  register,
  user_login,
  STrack_API_SuccessJob_From,
  STrack_API_UpdateStatus_From,
};
