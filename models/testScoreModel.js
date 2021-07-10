const mongoose = require("mongoose")

const testSchema = new mongoose.Schema({
    candidate:{
        type:mongoose.Types.ObjectId,
        ref:'candidate'
    },
    round:String,
    score:Number
},{timestamps:true})

const testSchoreModel = mongoose.model('testscore', testSchema);
module.exports= testSchoreModel;