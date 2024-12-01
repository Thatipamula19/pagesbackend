import  Express  from "express";

const faqController = require('../../controllers/Website/faqs');

const router = Express.Router();

// GET FAQS data
router.get('/', faqController.getFaqs);

// GET FAQ data
router.post('/faq', faqController.getFaq);

// POST FAQS data
router.post('/add', faqController.addFaqs);

// PUT FAQS data

router.post('/update', faqController.updateFaqs);

// DELETE FAQS data

router.post('/delete', faqController.deleteFaqs);



module.exports = router;