const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
    try{
    const {token} = req.cookies;
    if (!token){
        throw new Error("Token is not valid");
    }
    const decodedObj = await jwt.verify(token, "GeneralKenobi");
    const {_id} = decodedObj;
    const user = await User.findById(_id);
    if(!user) {
        throw new Error("User not found");
    }
    req.user = user;
    next();
    } catch (err) {
        res.status(400).send("Error" + err.message);
    }
};

module.exports = {userAuth};