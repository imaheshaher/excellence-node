const mongoose = require("mongoose")
var uniqueValidator = require('mongoose-unique-validator');

const candidateSchema = new mongoose.Schema({
  email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  name:String
 
 
},{timestamps:true})

candidateSchema.plugin(uniqueValidator, {message: 'is already taken.'});
const candidateModel = mongoose.model('candidate', candidateSchema);
module.exports= candidateModel;