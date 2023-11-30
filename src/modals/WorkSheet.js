const { model, Schema } = require("mongoose");

const WorkSheetSchema = new Schema({
    'name':{
        type:String ,
        required: true
    },
    "email":{
        type:String ,
        required: true
    },
    "task":{
        type:String ,
        required: true
    },
    "workHour":{
        type:Number ,
        required: true
    },
    "startDate":{
        type:String ,
        required: true
    },
})

const WorkSheet = model("WorkSheet",WorkSheetSchema)

module.exports = WorkSheet 