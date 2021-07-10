const candidateModel = require("../models/candidateModel")

const { validationResult } = require("express-validator");

module.exports.create= async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
           status:false,
           message: errors.array()[0].msg ,
           data:[]
        });
    }
    let data = req.body
    let candidateData = new candidateModel (data)
    candidateData.save((err,result) => {
        if(!err){
            return res.json({
                "status":true,
                "message":"candidate Created Succesfully",
                "data":result
            })
        }
        else {
            return res.json({
                "status":false,
                "message":err.message,
                "data":[]
            })
        }
    })
}


