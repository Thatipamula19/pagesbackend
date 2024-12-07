import mongoose from "mongoose";

const Schema = mongoose.Schema;
/**
 * @openapi
 * components:
 *   models:
 *     Page:
 *       type: object
 *       required:
 *         - page
 *         - pageUrl
 *       properties:
 *         page:
 *           type: string
 *         pageUrl:
 *           type: string
 *            
 */

const pageSchema = new Schema({
    page: {
        type: String,
        require: true
    },
    pageUrl: {
        type: String,
        require: true,
    },
    banners: {
        type: Array,
        require: false
    },
    faqs: {
        type: Array,
        require: false
    },
    keyFeatures: {
        type: Array,
        require: false
    }
});

module.exports = mongoose.model('Page', pageSchema);