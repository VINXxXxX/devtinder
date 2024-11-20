const mongoose = require("mongoose");
const validator = require("validator");
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

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;