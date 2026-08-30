const express=require('express');
//const auth=require("../middleware/upload");
const auth=require("../middleware/auth");
const {createBooking,getBookingList,getBookingDetails,getMyBookings}=require('../controller/bookingController');
const router=express.Router();

router.post('/create-booking',auth,createBooking);
router.get('/get-booking-list',auth,getBookingList);
router.get('/get-booking-details',auth,getBookingDetails);
router.get('/get-my-bookings',auth,getMyBookings);
module.exports=router

