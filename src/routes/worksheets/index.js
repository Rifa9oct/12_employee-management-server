var express = require("express");
const WorkSheet = require("../../modals/WorkSheet");
var router = express.Router();

router.get("/worksheet/:email", async (req, res) => {
    const email = req.params.email;
    const query = { email: email };
    const result = await WorkSheet.find(query);
    res.send(result);
})

//worksheet
router.post("/worksheet", async (req, res) => {
    const workSheet = new WorkSheet(req.body);
    const result = await workSheet.save();
    res.send(result);
})

module.exports = router