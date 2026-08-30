const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

const {registerUser, login, getUserDetails, deleteUserDetails, updateUserDetails, changePassword} = require('../controller/userController');
router.post('/register',registerUser);
router.post('/login',login);

router.get('/get-user-details',auth,getUserDetails);
router.delete('/delete-user-details',auth,deleteUserDetails);
router.patch('/update-user-details',auth,updateUserDetails);
router.patch('/change-password',auth,changePassword);

module.exports = router;

