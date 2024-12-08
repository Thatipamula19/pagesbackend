import Express from "express";

const userController = require('../../controllers/Website/users');
import authenticateToken from "../../middleware/isAuthenticated";
const router = Express.Router();

// GET Users data

/**
 * @openapi
 * '/user':
 *   get:
 *      tags:
 *      - Users
 *      summary: Get all users
 *      description: Get all users
 *      responses:
 *          200:
 *            description: Success
 *          500:
 *            description: Internal Server error
 */
router.get('/', authenticateToken, userController.getUsers);

// GET User data

/** 
 * @openapi
 * '/user/user':
 *   post:
 *     tags:
 *     - Users
 *     summary: Get user by userId
 *     description: Get by userId
 *     responses:
 *       200:
 *         description: Success
 *      404:
 *         description: User not found
 *      500:
 *         description: Server error
 * 
 */

router.get('/:userId', authenticateToken, userController.getUser);

// POST User data

/** 
 * @openapi
 * '/user/add':
 *   post:
 *     tags:
 *     - Users
 *     summary: Add user
 *     description: Add user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/models/users'
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               team:
 *                 type: string
 *               role:
 *                 type: string
 *               city:
 *                 type: string
 *               centerName:
 *                 type: string
 *               pageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: User added successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       402:
 *         description: Forbidden
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server error
 * 
 */

router.post('/add', authenticateToken, userController.addUser);

// PUT User data

/** 
 * @openapi
 * '/user/update':
 *   post:
 *     tags:
 *     - Users
 *     summary: Update user
 *     description: Update user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/models/users'
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               team:
 *                 type: string
 *               role:
 *                 type: string
 *               city:
 *                 type: string
 *               centerName:
 *                 type: string
 *               pageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       402:
 *         description: Forbidden
 *       403:
 *         description: Forbidden   
 *       500:
 *         description: Internal Server error   
 * 
 */

router.post('/update', authenticateToken, userController.updateRole);

// DELETE User data

/** 
 * @openapi
 * '/user/delete':
 *   post:
 *     tags:
 *     - Users
 *     summary: Delete user
 *     description: Delete user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       402:
 *         description: Forbidden
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server error
 * 
 */

router.post('/delete', authenticateToken, userController.deleteUser);

// User login

/** 
 * @openapi
 * '/user/login':
 *   post:
 *     tags:
 *     - Users
 *     summary: Login user
 *     description: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:   
 *       200:
 *         description: User logged in successfully * 
 *       400:
 *         description: Bad request
 *       401:
 *         description: Invalid Password
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server error
 * 
 */
router.post('/login', userController.loginUser);



module.exports = router;