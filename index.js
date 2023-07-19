'use strict';
const express = require('express');
const config = require('./config');
const cors = require('cors');
const fileupload = require("express-fileupload");
const bodyParser = require('body-parser');
const logger = require('./middleware/logger')

const ptec_useright = require('./routes/ptec_useright');

const app = express();


const corsConfig = {
    credentials: true,
    origin: true,
};

app.use(logger);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("files"));
app.use(fileupload());
app.use(cors(corsConfig))

app.use('/api', ptec_useright.routes);

app.listen(config.PTEC.port, () => console.log('Server is listening on http://localhost : port : ' + config.PTEC.port));