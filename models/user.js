const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    firstName:  {
        type: String,
        required: true,
    },
    lastName:  {
        type: String,
    },
    emailId:  {
        type: String,
        unique: true,
        required: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address" + value);
            }
        }
    },
    password:  {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isStrongPassword(value)){
                throw new Error("Weak Password" + value);
            }
        }
    },
    age:  {
        type: Number,
    },
    gender:  {
        type: String,
    },
    photoUrl:  {
        type: String, 
    },
    skills:  {
        type: [String],
    },
});
userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "GeneralKenobi", {
        expiresIn: "7d",
    });

    return token;
};
userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash);

    return isPasswordValid;
}
module.exports = mongoose.model("User", userSchema);
