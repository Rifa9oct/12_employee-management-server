const express = require('express');
const applyMiddleware = require('./middlewares/applyMiddleware');
const connectDB = require('./db/connectDB');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;


const authenticationRoutes = require("../src/routes/authentication/index")
const reviews = require("./routes/reviews")
const users = require('./routes/users')
const payments = require('./routes/payments')
const worksheets = require('./routes/worksheets')

//middleware
applyMiddleware(app)

app.use(authenticationRoutes);
app.use(reviews);
app.use(users);
app.use(payments);
app.use(worksheets);


// check admin or not 
app.get("/users/admin/:email", async (req, res) => {
    const email = req.params.email;
    if (email !== req.user.email) {
        return res.status(403).send({ message: "forbidden access" });
    }
    const query = { email: email };
    const user = await userCollection.findOne(query);
    let admin = false;
    if (user) {
        admin = user?.role === "admin";
    }
    res.send({ admin });
})










app.get("/", (req, res) => {
    res.send("EMPLOYEE MANAGEMENT SERVER IS RUNNING....");
});

app.all("*", (req, res, next) => {
    const error = new Error(`Can't find ${req.originalUrl} on the server`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.satus(err.status || 500).json({
        message: err.message
    })
})

// error handling middleware (call connectDB)
// app.use(globalErrorHandler);
const main = async () => {
    await connectDB()
    app.listen(port, () => {
        console.log(`Employee Management server is running, ${port}`);
    });
}
main();