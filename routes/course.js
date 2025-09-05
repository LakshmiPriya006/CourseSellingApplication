const express = require("express");
const { Router } = express;
const courseRouter = Router();
const { courseModel, purchaseModel } = require("../db");
const { auth } = require("../middleware/user"); // 1. Import the user auth middleware

// 2. SECURE THE ROUTE: Add the 'auth' middleware here.
// The middleware will run first, verify the user's token, and add 'req.userId'.
courseRouter.post("/purchase", auth, async function(req, res){
    const userId = req.userId; // Now we get the userId securely from the middleware
    const { courseId } = req.body;

    if (!courseId) {
        return res.status(400).json({ message: "Course ID is required." });
    }

    try {
        // Optional: Check if the user has already bought this course
        const existingPurchase = await purchaseModel.findOne({ userId, courseId });
        if (existingPurchase) {
            return res.status(409).json({ message: "You have already purchased this course." });
        }
        
        // should check that the user has actually paid the price (in a real app)
        await purchaseModel.create({
            userId,
            courseId
        });

        res.json({
            message: "You have successfully bought the course"
        });

    } catch (error) {
        console.error("Error during course purchase:", error);
        res.status(500).json({ message: "Failed to purchase course." });
    }
});

courseRouter.get("/preview", async function(req, res){
    const courses = await courseModel.find({});
    res.json({
        courses
    });
});

module.exports = {courseRouter: courseRouter};
