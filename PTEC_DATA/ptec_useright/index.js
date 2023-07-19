'use strict';

const userLoginPage = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.objcn_usersright.sql);
    const login = await pool.request()
      .input('UserCode', sql.VarChar(20), res.UserCode)
      .input('Password', sql.VarChar(20), res.Password)
      .query(`exec ${config.PTEC.objcn_usersright.sql.database}.dbo.User_Login @UserCode,@Password `);
    //sql.close()
    return login.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const STrack_Register_API = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.object_ptec_ops.sql);
    const oneUser = await pool.request()
      .input('Vendor_Code', sql.NVarChar, res.Vendor_Code)
      .input('companyname', sql.NVarChar, res.companyname)
      .input('Email', sql.NVarChar, res.Email)
      .input('Tel', sql.NVarChar, res.Tel)
      .input('Taxid', sql.NVarChar, res.Taxid)
      .input('Token', sql.NVarChar, res.Token)
      .query(`exec ${config.PTEC.object_test_ops.sql.database}.dbo.[STrack_Register_API] @Vendor_Code, @companyname, @Email, @Tel, @Taxid, @Token`);
    //sql.close()
    return oneUser.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const STrack_SuccessJob_From_API = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.objcn_usersright.sql);
    const login = await pool.request()
      .input('stkcode', sql.NVarChar, res.stkcode)
      .input('begindate', sql.DateTime, res.begindate)
      .input('enddate,', sql.DateTime, res.enddate,)
      .input('detail', sql.NVarChar, res.detail ?? null)
      .input('update_by', sql.NVarChar, res.update_by ?? null)
      .input('taxid', sql.NVarChar, res.taxid)
      .query(`exec ${config.PTEC.objcn_usersright.sql.database}.dbo.STrack_SuccessJob_From_API @stkcode, @begindate, @enddate, @detail, @update_by, @taxid `);
    //sql.close()
    return login.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

const STrack_UpdateStatus_From_API = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
  try {
    let pool = await sql.connect(config.PTEC.objcn_usersright.sql);
    const login = await pool.request()
      .input('stkcode', sql.NVarChar, res.stkcode)
      .input('order', sql.NVarChar, res.order)
      .input('stepid,', sql.Int, res.stepid,)
      .input('update_by', sql.NVarChar, res.update_by ?? null)
      .input('taxid', sql.NVarChar, res.taxid)
      .query(`exec ${config.PTEC.objcn_usersright.sql.database}.dbo.[STrack_SuccessJob_From_API] @stkcode, @order, @stepid, @update_by, @taxid `);
    //sql.close()
    return login.recordset;
  } catch (error) {
    //sql.close()
    return error.message;
  }
}

module.exports = {
  STrack_Register_API,
  userLoginPage,
  STrack_SuccessJob_From_API,
  STrack_UpdateStatus_From_API
}