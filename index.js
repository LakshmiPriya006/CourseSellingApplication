const express = require("express");

const { Router } = express;

const app = express();

const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const {userRouter} = require("./routes/user")
const {courseRouter} = require("./routes/course");
const {adminRouter} = require("./routes/admin");

app.use(express.json());

app.use("/user", userRouter)
app.use("/courses", courseRouter)
app.use("/admin", adminRouter)

app.get("/", function(req, res){
    sendFile(__dirname + "/public/index.html")
})

async function main(){
    await mongoose.connect(process.env.MONGO_URL);

    const port = process.env.PORT; // real app 

    app.listen(port, () => {
        console.log(`Server is running on Port ${port}`)
    }); // this indicates our server is started 
    
}

main();