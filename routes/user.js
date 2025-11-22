const express = require("express");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const {z} = require("zod");

const { userModel, purchaseModel, courseModel } = require("../db");

const {auth} = require("../middleware/user");

const {JWT_USER_SECRET} = require("../config")

const { Router } = express;

const userRouter = Router();


userRouter.post("/signup", async function(req, res){

    const requiredBody = z.object({
        email: z.string().min(3).max(100).email(),
        firstName: z.string().min(3).max(100),
        lastName: z.string().min(3).max(100),
        password: z.string().min(3).max(30)
    })

    const parsedDataWithSuccess = requiredBody.safeParse(req.body)
    if (!parsedDataWithSuccess.success){
        res.json({
            message: "Not fit with the validation rules",
            error: parsedDataWithSuccess.error
        })
        return;
    }
    const email = req.body.email;
    const firstName = req.body.firstName;
    const password = req.body.password;
    const lastName = req.body.lastName;

    const hashedPassword = await bcrypt.hash(password, 5)
    try{
        await userModel.create({
            email,
            firstName,
            lastName,
            password: hashedPassword
        })
        
        res.json({
            message: "You are signed up"
        })
    } catch(err) {
        res.json({
            message: "User already exists!!!"
        })
    }

});

userRouter.post("/signin", async function(req, res){
    const email = req.body.email;
    const password = req.body.password;

    const user = await userModel.findOne({
        email: email
    });
    if (!user) {
        return res.status(403).json({
            message: "Incorrect credentials"
        });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
        const token = jwt.sign({
            id: user._id.toString()
        }, JWT_USER_SECRET)

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }

});


userRouter.get("/purchases", auth, async function(req, res){
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId,
    });

    let purchasedCourseIds = [];

    for (let i = 0; i<purchases.length;i++){ 
        purchasedCourseIds.push(purchases[i].courseId)
    }

    const coursesData = await courseModel.find({
        _id: { $in: purchasedCourseIds }
    })

    res.json({
        purchases,
        coursesData
    })
});


module.exports = {userRouter:userRouter}