const User = require("../models/user")
const Package = require("../models/package")
const Booking = require("../models/bookingModule")
const {transporter} = require("../config/db");
require('dotenv').config();

const createBooking = async (req, res) => {

    try {
        const { packageId, travelDate, guest } = req.body;
        const user = req.user;
        const userdata = await User.findById(user.id);
        const packageData = await Package.findById(packageId);

        if (!packageData) {
            return res.status(404).json({

                   message: "package not found"
            })

        }
        if (guest > packageData.availableSeats) {
            return res.status(404).json({
                message: "this much seats are not available"
            })
        }
        totalAmount = guest * packageData.price;
        const booking = await Booking({
            user: userdata,

            package: packageData,
            travelDate: travelDate,
            guest: guest,
            totalAmount: totalAmount
        })
        const savedBooking = await booking.save();

        console.log(process.env.EMAIL_USER)

        transporter.sendMail({
            from:process.env.EMAIL_USER,
            to:user.email,
            subject:"Booking Received",
            html:`
                <h2>Booking Received Successfully</h2>
                <p>Hello ${user.name}</p>
                <p>Your Booking Request has been received</p>
            `
        })

        return res.status(201).json({
            message: "Booking confirmed",
            booking: savedBooking
        })


    } catch (error) {
        console.log("Booking creation error:", error);
        return res.status(400).json({
            message: error.message
        })
    }

}
const getBookingList = async (req, res) => {
    try {
        //const { minPrice, maxPrice } = req.query;
        const getBookingList= await Booking.find({
            totalAmount:{$gte:60000}
        });
        if (getBookingList.length == 0) {
            res.status(200).json({

                
                message: "no any booking list available"
            })
        }

        res.status(200).json({
            count: getBookingList.length,
            getBooking_list: getBookingList
        })
        console.log(getBookingList)

    } catch (error) {

        res.status(400).json({
            message: res.error
        })
    }
}
const getBookingDetails = async (req, res) => {
    try {
        constbookingDetails = await Booking.findById(req.params?.id);
        return res.status(200).json({
            message: "success",
            BookingDetails: BookingDetails

        })


    } catch (error) {
        res.status(400).json({
            message: res.error
        })

    }
}
const getMyBookings = async (req, res) => {
    try {
        const { id } = user.id
        const bookings = await Booking.find()
    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
}

module.exports = { createBooking, getBookingList, getBookingDetails, getMyBookings }