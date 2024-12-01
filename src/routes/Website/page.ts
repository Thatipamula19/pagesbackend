import  Express  from "express";

const pageController = require('../../controllers/Website/page');

const router = Express.Router();

// GET Pages data
router.get('/', pageController.getPages);

// GET Page data
router.post('/page', pageController.getPage);

// POST Page data
router.post('/addPage', pageController.addPage);

// PUT Page data

router.post('/updatePage', pageController.updatePage);

// DELETE Page data

router.post('/deletePage', pageController.deletePage);



module.exports = router;