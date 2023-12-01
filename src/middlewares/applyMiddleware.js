const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { LOCAL_CLIENT, CLIENT } = require('../config/default');

const applyMiddleware = (app) => {
    // middleware  
    app.use(cors({
        origin: [
            LOCAL_CLIENT,
           "https://tricky-earthquake.surge.sh"
        ],
        credentials: true
    }));
    app.use(express.json());
    app.use(cookieParser());
}

module.exports = applyMiddleware