const { model, Schema } = require("mongoose");

const ReviewSchema = new Schema({
    'img':{
        type:String ,
        required: true
    },
    "description":{
        type:String ,
        required: true
    },
    "name":{
        type:String ,
        required: true
    },
    "role":{
        type:String ,
        required: true
    },
    "rating":{
        type:Number ,
        required: true
    },
})

const Review = model("Review",ReviewSchema)

module.exports = Review 