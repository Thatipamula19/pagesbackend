import  Express  from "express";

const pageController = require('../../controllers/Website/page');
import authenticateToken from "../../middleware/isAuthenticated";

const router = Express.Router();

// GET Pages data

/** 
 * @openapi
 * '/pages':
 *   get:
 *     tags:
 *     - Website
 *     summary: Get all pages
 *     description: Get all pages
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', authenticateToken, pageController.getPages);

// GET Page data

/** 
 * @openapi
 * '/pages/page':
 *   post:
 *     tags:
 *     - Website
 *     summary: Get page by pageUrl
 *     description: Get page by pageUrl
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Page not found
 *       500:
 *         description: Server error
 * 
*/

router.post('/page', authenticateToken, pageController.getPage);

// POST Page data

/** 
 * @openapi
 * '/pages/addPage':
 *   post:
 *     tags:
 *     - Website
 *     summary: Add page
 *     description: Add page
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page:
 *                 type: string
 *               pageUrl:
 *                 type: string
 *               banners:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     imageWeb:
 *                       type: string
 *                     imageMob:
 *                       type: string
 *               keyFeatures:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     image:
 *                       type: string
 *               faqs:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     question:
 *                       type: string
 *                     answer:  
 *                       type: string
 *     responses:
 *       201:
 *         description: Page is created successfully
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: string
 *                 pageUrl:
 *                   type: string
 *                 banners:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       imageWeb:
 *                         type: string
 *                       imageMob:
 *                         type: string
 *                 keyFeatures:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       image:
 *                         type: string
 *                 faqs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       question:
 *                         type: string
 *                       answer:  
 *                         type: string
 *       403:
 *         description: Forbidden
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error    
 * 
*/

router.post('/addPage', authenticateToken, pageController.addPage);

// PUT Page data

/** 
 * @openapi
 * '/pages/updatePage':
 *   post:
 *     tags:
 *     - Website
 *     summary: Update page
 *     description: Update page
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page:
 *                 type: string
 *               pageUrl:
 *                 type: string
 *               banners:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     imageWeb:
 *                       type: string
 *                     imageMob:
 *                       type: string
 *               keyFeatures:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     image:
 *                       type: string
 *               faqs:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     question:
 *                       type: string
 *                     answer:  
 *                       type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Page not found
 *       500:
 *         description: Server error    
 *       401:
 *         description: Unauthorized
 *       402:
 *         description: Forbidden
 *       403:
 *         description: Forbidden
 *       400:
 *         description: Bad request
*/

router.post('/updatePage', authenticateToken, pageController.updatePage);

// DELETE Page data

/** 
 * @openapi
 * '/pages/deletePage':
 *   post:
 *     tags:
 *     - Website
 *     summary: Delete page
 *     description: Delete page
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page:
 *                 type: string
 *     responses:
 *       200:
 *         description: Page deleted successfully 
 *       404:
 *         description: Page not found
 *       500:
 *         description: Server error    
 *       401:
 *         description: Unauthorized
 *       402:
 *         description: Forbidden
 *       403:
 *         description: Forbidden
 *       400:
 *         description: Bad request
 * */

router.post('/deletePage', authenticateToken, pageController.deletePage);



module.exports = router;