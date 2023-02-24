const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        lowercase: true
    },
    username :String,
    password : String,
    passwordConfirm : String
})

module.exports = mongoose.model("User", userSchema)