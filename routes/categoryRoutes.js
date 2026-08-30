const express = require('express');
const { createCategory, getAllCategories } = require('../controller/categoryController');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/create-category',auth,createCategory);

router.get('/get-category',auth,getAllCategories);
module.exports = router;


