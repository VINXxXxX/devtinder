const express = require("express");
const connectDB = require("../config/database");
const app = express();
const User = require("../models/user.js");
const {validationSignUpData} = require("../utils/validation.js");
const bcrypt = require("bcrypt");
app.use(express.json());
app.post("/signup", async (req, res) => {
    //
    try {
        validationSignUpData(req);
        const {firstName, lastName, emailId, password} = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({
            firstName, 
            lastName, 
            emailId, 
            password: passwordHash,
        });
        await user.save();
        res.send("User added successfully");
    }
    catch(err) {
        res.status(400).send("Error saving the user" + err.message);
    }
});

app.post("/login", async (req, res) => {
    try {
        const {emailId, password} = req.body;
        const user = await User.findOne({ emailId: emailId});
        if(!user) {
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid){
            res.send("Login Successfully");
        } else {
            throw new Error("Invalid Credentials");
        }
    } catch(err){
        res.status(400).send("Error:" + err.message);
    }
});
app.get("/signup", async (req, res) => {
    const userEmail = req.body.emailId;

    try {
        const user = await User.find({emailId: userEmail});

        res.send(user);
    } catch(err) {
        res.status(400).send("Something went wrong!");
    }
})
connectDB()
    .then(() => {
    console.log("Connected Successfully!");
    app.listen(3000, () => {
        console.log("Server running successfully on 3000");
    });
})
    .catch((err) => {
    console.error("Not Connected");
});
