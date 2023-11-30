var express = require("express");
const { createCookieToken, logout } = require("../../api/authentication/controllers");
var router = express.Router();

//auth related api (generate token)
router.post('/jwt',createCookieToken)

//clear token from cookie
router.post('/logout',logout)

module.exports = router;