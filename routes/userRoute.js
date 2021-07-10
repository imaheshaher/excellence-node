const { check, oneOf } = require("express-validator");
const candidateController = require("../controllers/candidateController")
const testScoreController = require("../controllers/testScoreController")


const router = require("express").Router()

//Register user 
router.post("/register",[
    check('email').not().isEmpty().withMessage('Enter the Email').isEmail().withMessage('Enter the valid email'),
    check('name').not().isEmpty().withMessage('Enter the  Name').isString().withMessage('Name should be only String'),
 ],candidateController.create);


router.post("/test",[
    check('round').not().isEmpty().withMessage('round is required').isIn(["first_round","second_round",'third_round']).withMessage('Enter the valid round name'),
    check('candidate').not().isEmpty().withMessage('Enter the Candidate Id'),
    check('score').not().isEmpty().withMessage('Enter the Score').isInt({min:0,max:10}).withMessage('Enter the score is out of 10')
],testScoreController.addTest)

router.get("/highscore",testScoreController.getHighestSchore)
router.get("/avgscore",testScoreController.getAvgScore)

module.exports=router

