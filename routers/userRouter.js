const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const requireAuth = require('../middlewares/authMiddleware');


router.post("/", userController.register);
router.post("/login", userController.login); 
router.get("/", requireAuth, userController.getAllUsers); 
router.delete("/:id", userController.deleteUser); 

module.exports = router;
