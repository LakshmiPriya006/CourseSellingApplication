const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");

const {userRouter} = require("./routes/user");
const {courseRouter} = require("./routes/course");
const {adminRouter} = require("./routes/admin");

app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increase limit for base64 images
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use("/user", userRouter);
app.use("/courses", courseRouter);
app.use("/admin", adminRouter);

// Serve frontend build if available
const frontendDist = path.join(__dirname, "frontend", "dist");
if (fs.existsSync(frontendDist)) {
    app.use(express.static(frontendDist));
    app.get("/", function (req, res) {
        res.sendFile(path.join(frontendDist, "index.html"));
    });
} else {
    app.get("/", function (req, res) {
        res.send(
            "Frontend build not found. Run the frontend dev server or build the frontend to serve static files."
        );
    });
}

async function main(){
        if (!process.env.MONGO_URL) {
                console.error("Missing required env var: MONGO_URL");
                process.exit(1);
        }
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database connected ${connect.connection.host}`);
        const port = process.env.PORT || 3000;

        app.listen(port, () => {
                console.log(`Server is running on Port ${port}`);
        });
}

main();