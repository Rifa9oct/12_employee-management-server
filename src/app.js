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

// const main = async () => {
//     await connectDB()
//     app.listen(port, () => {
//         console.log(`Employee Management server is running, ${port}`);
//     });
// }
// main();

module.exports = app;