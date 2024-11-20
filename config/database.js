const mongoose = require("mongoose");

const connectDB = async () => {
        await mongoose.connect("mongodb+srv://icandothisforallday3000:icandothisforallday3000@cluster0.lh8b7qv.mongodb.net/");
};

module.exports = connectDB;
