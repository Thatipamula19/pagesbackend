import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    team: {
        type: String,
        require: true
    },
    role:{
        type: String,
        require: false
    },
    city: {
        type: String,
        require: false
    },
    centerName: {
        type: String,
        require: false
    },
    pageUrl:{
        type: String,
        require: false
    }
});

module.exports = mongoose.model('User', userSchema);