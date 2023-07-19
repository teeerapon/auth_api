'use strict';

const express = require('express');
const ptec_useright = require('../controllers/ptec_useright');
const router = express.Router();

const {
    user_login,
    STrack_SuccessJob_From_API,
    STrack_UpdateStatus_From_API
} = ptec_useright;

router.post('/user_login', user_login);
router.post('/STrack_SuccessJob_From_API', STrack_SuccessJob_From_API);
router.post('/STrack_UpdateStatus_From_API', STrack_UpdateStatus_From_API);

module.exports = {
    routes: router
}