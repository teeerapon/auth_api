'use strict';

const userLoginPage = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
    let pool = await sql.connect(config.PTEC.object_test_ops.sql);
    const response = await pool.request()
      .input('UserCode', sql.VarChar(20), res.usercode)
      .input('Password', sql.VarChar(20), res.password)
      .query(`exec ${config.PTEC.object_test_ops.sql.database}.dbo.User_Login @UserCode,@Password `);
    sql.close()
    return response.recordsets;
}

const STrack_API_CheckUserExists = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
    let pool = await sql.connect(config.PTEC.object_test_ops.sql);
    const response = await pool.request()
      .input('Vendor_Code', sql.NVarChar, res.vendor_code)
      .input('Taxid', sql.NVarChar, res.taxid)
      .query(`exec ${config.PTEC.object_test_ops.sql.database}.dbo.[STrack_API_CheckUserExists] @Vendor_Code,@Taxid`);
    return response.recordsets;
}

const STrack_API_Register = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
    let pool = await sql.connect(config.PTEC.object_test_ops.sql);
    const response = await pool.request()
      .input('Vendor_Code', sql.NVarChar, res.vendor_code)
      .input('Email', sql.NVarChar, res.email)
      .input('Tel', sql.NVarChar, res.tel)
      .input('Taxid', sql.NVarChar, res.taxid)
      .query(`exec ${config.PTEC.object_test_ops.sql.database}.dbo.[STrack_API_Register] @Vendor_Code, @Email, @Tel, @Taxid`);
    return response.recordsets;
}

const STrack_API_SuccessJob_From = async (res) => {
  const config = require('../../config');
  const sql = require('mssql');
    let pool = await sql.connect(config.PTEC.object_test_ops.sql);
    console.log(res.begindate);
    console.log(res.enddate);
    const response = await pool.request()
      .input('opscode', sql.NVarChar, res.opscode)
      .input('begindate', sql.DateTime, res.begindate)
      .input('enddate', sql.DateTime, res.enddate)
      .input('detail', sql.NVarChar, res.detail)
      .input('taxid', sql.NVarChar, res.taxid)
      .query(`exec ${config.PTEC.object_test_ops.sql.database}.dbo.STrack_API_SuccessJob_From @opscode, @begindate, @enddate, @detail,  @taxid `);
    sql.close()
    return response.recordsets;
}

const STrack_API_UpdateStatus_From = async (res) => {
  // console.log('in2');
  const config = require('../../config');
  const sql = require('mssql');
  let pool = await sql.connect(config.PTEC.object_test_ops.sql);
  const response = await pool.request()
    .input('opscode', sql.NVarChar, res.opscode)
    .input('order', sql.NVarChar, res.order)
    .input('stepid', sql.Int, res.stepid)
    .input('taxid', sql.NVarChar, res.taxid)
    .query(`exec ${config.PTEC.object_test_ops.sql.database}.dbo.[STrack_API_UpdateStatus_From] @opscode, @order, @stepid, @taxid `);
  sql.close()
  return response.recordsets;
}

module.exports = {
  userLoginPage,
  STrack_API_Register,
  STrack_API_CheckUserExists,
  STrack_API_SuccessJob_From,
  STrack_API_UpdateStatus_From
}