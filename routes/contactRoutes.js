const express=require('express');
const { submitEnquiry, getEnquiry, updateEnquiry } = require('../controller/contactController');

const router = express.Router();

router.post('/',submitEnquiry);
router.get('/get-enquiry',getEnquiry);
router.patch('/update-enquiry/:id',updateEnquiry);

module.exports=router;