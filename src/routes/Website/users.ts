import  Express  from "express";

const userController = require('../../controllers/Website/users');

const router = Express.Router();

// GET Users data
router.get('/', userController.getUsers);

// GET User data
router.get('/:userId', userController.getUser);

// POST User data
router.post('/add', userController.addUser);

// PUT User data

router.post('/update', userController.updateRole);

// DELETE User data

router.post('/delete', userController.deleteUser);

// User login

router.post('/login', userController.loginUser);



module.exports = router;