var express = require("express");
const mongoose = require('mongoose');
const User = require("../../modals/User");
const verifyToken = require("../../middlewares/verifyToken");
var router = express.Router();

//verify admin or not (done)
router.get("/users/admin/:email", verifyToken, async (req, res) => {
    const email = req.params.email;
    console.log(req.user.email)
    if (email !== req.user.email) {
        return res.status(403).send({ message: "forbidden access" });
    }
    const query = { email: email };
    const user = await User.findOne(query);
    let admin = false;
    if (user) {
        admin = user?.role === "admin";
    }
    res.send({ admin });
})

//check HR or not (done)
router.get("/users/hr/:email", verifyToken, async (req, res) => {
    const email = req.params.email;
    if (email !== req.user.email) {
        return res.status(403).send({ message: "forbidden access" });
    }
    const query = { email: email };
    const user = await User.findOne(query);
    let hr = false;
    if (user) {
        hr = user?.role === "hr";
    }
    res.send({ hr });
})

//check Employee or not (done)
router.get("/users/employee/:email", verifyToken, async (req, res) => {
    const email = req.params.email;
    if (email !== req.user.email) {
        return res.status(403).send({ message: "forbidden access" });
    }
    const query = { email: email };
    const user = await User.findOne(query);
    let employee = false;
    if (user) {
        employee = user?.role === "employee";
    }
    res.send({ employee });
})

//(done)
router.get('/users', async (req, res) => {
    const result = await User.find();
    res.send(result);
})

//(done)
router.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: id };
    const result = await User.findOne(query);
    res.send(result);
})


//(done)
router.post("/users", async (req, res) => {
    const userItem = new User(req.body);
    const result = await userItem.save();
    res.send(result);
})


//update user verified or not (done)
router.patch('/users/:id',verifyToken, async (req, res) => {
    const id = req.params.id;
    const filter = { _id: id };
    const updatedDoc = {
        $set: {
            verified: true
        }
    }
    const result = await User.updateOne(filter, updatedDoc);
    res.send(result);
})

//update user role (done)
router.patch('/users/hr/:id',verifyToken, async (req, res) => {
    const id = req.params.id;
    const changeRole = req.body;
    const filter = { _id: id };
    const updatedDoc = {
        $set: {
            role: changeRole.role
        }
    }
    const result = await User.updateOne(filter, updatedDoc);
    res.send(result);
})


//user is fired
router.patch('/users/fired/:id',verifyToken, async (req, res) => {
    const id = req.params.id;
    const filter = { _id: id };
    const updatedDoc = {
        $set: {
            fired: true
        }
    }
    const result = await User.updateOne(filter, updatedDoc);
    res.send(result);
})


module.exports = router