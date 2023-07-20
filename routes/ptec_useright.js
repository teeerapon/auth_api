'use strict';

const express = require('express');
const ptec_useright = require('../controllers/ptec_useright');
const auth_outside = require('../middleware/auth_outside.js')
const router = express.Router();

const {
    register,
    login_outside,
    STrack_API_SuccessJob_From,
    STrack_API_UpdateStatus_From
} = ptec_useright;

router.post('/register',register);
router.post('/login_outside', login_outside);
router.post('/STrack_API_SuccessJob_From',auth_outside, STrack_API_SuccessJob_From);
router.post('/STrack_API_UpdateStatus_From',auth_outside, STrack_API_UpdateStatus_From);

module.exports = {
    routes: router
}