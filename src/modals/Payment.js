const { model, Schema } = require("mongoose");

const PaymentSchema = new Schema({
    'name':{
        type:String ,
        required: true
    },
    "email":{
        type:String ,
        required: true
    },
    "transactionId":{
        type:String ,
        required: true
    },
    "date":{
        type:String ,
        required: true
    },
    "amount":{
        type:Number ,
        required: true
    },
    "monthYear":{
        type:String ,
        required: true
    },
})

const Payment = model("Payment",PaymentSchema)

module.exports = Payment 