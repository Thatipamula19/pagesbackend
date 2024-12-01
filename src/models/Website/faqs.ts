import mongoose from "mongoose";

const Schema = mongoose.Schema;

const faqsSechema = new Schema({
    page: {
        type: String,
        require: true
    },
    faqs: []
});

module.exports = mongoose.model('Faqs', faqsSechema);