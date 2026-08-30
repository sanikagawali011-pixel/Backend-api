const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const { createPackage, deletePackage, updatePackage, getAllPackages } = require("../controller/packageController");

router.post('/create-package',auth,upload.array('images',12),createPackage);
router.delete('/delete-package/:id',auth,deletePackage);
router.patch('/update-package/:id',auth,updatePackage);
router.get('/get-all-package',auth,getAllPackages);

module.exports = router;