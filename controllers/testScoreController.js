const testModel = require("../models/testScoreModel")
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const candidateModel = require("../models/candidateModel")

module.exports.addTest = async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
           status:false,
           message: errors.array()[0].msg ,
           data:[]
        });
    }
    let data = req.body

    let candidateId = data.candidate
    
    
    let isRound = await testModel.findOne({candidate:candidateId,round:data.round})
    if(isRound){
            return res.json({
                "status":false,
                "message":"Candidate attempted this round",
                "data":isRound
            })
        }
    
    
    let testData = new testModel(data)

    await testData.save((err,result) => {
        if(!err){
            return res.json({
                "status":true,
                "message":"test score Created Succesfully",
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



module.exports.getHighestSchore = async(req,res) => {

    let highScore = await candidateModel.aggregate([
        {
            "$lookup":{
                "from":"testscores",
                "localField":"_id",
                "foreignField":"candidate",
                "as":"scoreinfo"
            }
        },
        {$unwind:"$scoreinfo"},
        {
            $group:{
                "_id":"$_id",
                "name":{$first:"$name"},
                "email":{$first:"$email"},
                "totalscore":{$sum:"$scoreinfo.score"},

                
            }
        },
        {$sort:{total:-1}},
        {$limit:1}
        
       
    ]).exec()

    return res.json({
        "status":true,
        "message":"Highest Score",
        "data":highScore
    })
}


module.exports.getAvgScore = async(req,res) => {

    let avgScore = await candidateModel.aggregate([
        {
            "$lookup":{
                "from":"testscores",
                "localField":"_id",
                "foreignField":"candidate",
                "as":"scoreinfo"
            }
        },
        {$unwind:"$scoreinfo"},
        {
            $group:{
                "_id":"$_id",
                "name":{$first:"$name"},
                "email":{$first:"$email"},
                "avgscore":{$avg:{$sum:"$scoreinfo.score"}},
                

                
            }
        },
        {$sort:{avg:-1}}
       
    ]).exec()

    return res.json({
        "status":true,
        "message":"Highest Score",
        "data":avgScore
    })
}