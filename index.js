/*
* express->(npm i express)
* mongoose->(npm i mongoose)
* dotenv->(npm i dotenv)
* nodemon->(npm i nodemon -g)
* */
const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require('cors')

/*=================================*/
const CustomerRoute = require('./route/CustomerRoute');
const UserRoute = require('./route/UserRoute');
const OrderRoute = require('./route/OrderRoute');
/*=================================*/

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(cors())

const serverPort = process.env.SERVER_PORT;
mongoose.connect(
    "mongodb://localhost:27017/pos",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
).then(() => {
    app.listen(serverPort, () => {
        console.log(`User Service is Up And Running on ${serverPort}`)
    })
}).catch(error => {
    console.log(error);
});

/*========================*/
app.use('/api/v1/customerRoute', CustomerRoute);
app.use('/api/v1/userRoute', UserRoute);
app.use('/api/v1/orderRoute', OrderRoute);
