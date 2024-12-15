import  Express  from "express";
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const studentResultsController = require('../../controllers/StudentResults/StudentResults');

const router = Express.Router();

// POST Upload Results

/**
 * @openapi
 * /student/upload:
 *   post:
 *     summary: Upload Student Results
 *     tags:
 *     - StudentResults
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               excelFile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Error processing the file
 */

router.post('/upload', upload.single('excelFile'), studentResultsController.uploadResults);

// GET Student Results

/**
 * @openapi
 * /student/results:
 *   get:
 *     summary: Get Student Results
 *     tags:
 *     - StudentResults
 *     responses:
 *       200:
 *         description: Student Results fetched successfully
 *       500:
 *         description: Internal Server error
 */
router.get('/results', studentResultsController.getStudentResults);

// GET Student Result

/**
 * @openapi
 * /student/result:
 *   get:
 *     summary: Get Student Result
 *     tags:
 *     - StudentResults
 *     parameters:
 *       - name: studentId
 *         in: query
 *         required: true
 *         description: Student ID
 *         schema:
 *           type: string
 *           required: true
 *     responses:
 *       200:
 *         description: Student Result fetched successfully
 *       500:
 *         description: Internal Server error
 */
router.get('/result', studentResultsController.getStudentResult);


module.exports = router;