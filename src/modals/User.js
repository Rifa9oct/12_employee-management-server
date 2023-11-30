const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
    'name':{
        type:String ,
        required: true
    },
    "email":{
        type:String ,
        required: true
    },
    "account_no":{
        type:String ,
        required: true
    },
    "designation":{
        type:String ,
        required: true
    },
    "role":{
        type:String ,
        required: true
    },
    "salary":{
        type:String ,
        required: true
    },
    "image":{
        type:String ,
        required: true
    },
    "verified":{
        type:Boolean ,
        required: true
    },
    "fired":{
        type:Boolean ,
        required: true
    },
})

const User = model("User",UserSchema)

module.exports = User 