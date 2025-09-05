const express = require("express");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const {z} = require("zod");

const { adminModel, courseModel } = require("../db");

const {JWT_ADMIN_SECRET} = require("../config");

const {auth} = require("../middleware/admin")

const { Router } = express;

const adminRouter = Router();


adminRouter.post("/signup", async function(req, res){
    console.log("--- Admin signup route hit ---");
    console.log("Request Body:", req.body);

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
        await adminModel.create({
            email,
            firstName,
            lastName,
            password: hashedPassword
        })
        
        res.json({
            message: "Signup Successful"
        })
    } catch(err) {
        res.json({
            message: "User already exists!!!"
        })
    }
});

adminRouter.post("/signin", async function(req, res){
    const email = req.body.email;
    const password = req.body.password;

    const admin = await adminModel.findOne({
        email: email
    });
    if (!admin) {
        return res.status(403).json({
            message: "Incorrect credentials"
        });
    }
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (passwordMatch) {
        const token = jwt.sign({
            id: admin._id.toString()
        }, JWT_ADMIN_SECRET)

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials",
        })
    }
});

// this route is used to create courses by admin
adminRouter.post("/course", auth, async function(req, res){
    const adminId = req.adminId;
    const { title, description, price, imageUrl} = req.body;

    const course = await courseModel.create({
        title, 
        description,
        price,
        imageUrl,
        creatorId: adminId // currently which admin loggedin when creating course
    })

    res.json({
        message: "Course Created",
        courseId : course._id
    })

});

// this route is used to update the courses
adminRouter.put("/course", auth, async function(req, res){
    const adminId = req.adminId;
    const { title, description, price, imageUrl, courseId} = req.body;
    
    const course = await courseModel.updateOne({
        _id : courseId,
        creatorId: adminId
    }, {
        title, 
        description,
        price,
        imageUrl
    })
    res.json({
        message: "Course Updated",
        courseId
    })

});

// this route enables admin to see all the courses available in application
adminRouter.get("/course/bulk", auth, async function(req, res){
    const adminId = req.adminId;
    const courses = await courseModel.find({
        creatorId: adminId
    })

    res.json({
        message : "All courses",
        courses
    })
});

module.exports = {adminRouter: adminRouter};