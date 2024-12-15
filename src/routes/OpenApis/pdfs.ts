import  Express  from "express";

const pdfController = require('../../controllers/OpenApis/pdfs');

const router = Express.Router();

// GET Report Pdf

/**
 * @openapi
 * '/pdfs/download-report':
 *   post:
 *     tags:
 *     - PDFs
 *     summary: Generate report
 *     description: Generate report
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               testData:
 *                 type: object
 *               reportData:
 *                 type: object
 *     responses:
 *       200:
 *         description: Report generated
 *       500:
 *         description: Internal Server error
 */
router.post('/download-report', pdfController.generateReport);

// Get Certificate Pdf

/**
 * @openapi
 * '/pdfs/download-certificate':
 *   post:
 *     tags:
 *     - PDFs
 *     summary: Generate certificate
 *     description: Generate certificate
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               testData:
 *                 type: object
 *     responses:
 *       200:
 *         description: Certificate generated
 *       500:
 *         description: Internal Server error
 */

router.post('/download-certificate', pdfController.generateCertificate);


module.exports = router;