var express = require("express");
const Review = require("../../modals/Review");
var router = express.Router();

router.get('/reviews', async (req, res) => {
    const result = await Review.find();
    res.send(result);
})

module.exports = router