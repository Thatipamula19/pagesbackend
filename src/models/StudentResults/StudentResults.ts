import mongoose from "mongoose";

const Schema = mongoose.Schema;

const studentResultsSchema = new Schema({
    studentId: {
        type: String,
        require: true
    },
    studentName: {
        type: String,
        require: true
    },
    studentEmail: {
        type: String,
        require: true
    },
    studentPhone: {
        type: String,
        require: true
    },
    telugu: {
        type: String,
        require: true
    },
    english: {
        type: String,
        require: true
    },
    math: {
        type: String,
        require: true
    },
    science: {
        type: String,
        require: true
    },
    social: {
        type: String,
        require: true
    },
    hindi: {
        type: String,
        require: true
    }

});

module.exports = mongoose.model('StudentResults', studentResultsSchema);