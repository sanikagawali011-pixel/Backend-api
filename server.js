const {connectDB} = require('./config/db');
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const packageRoutes = require('./routes/packageRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const contactRoutes = require('./routes/contactRoutes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())

connectDB();

app.use('/users',userRoutes)
app.use('/packages',packageRoutes)
app.use('/category',categoryRoutes)
app.use('/bookings',bookingRoutes)
app.use('/contactus',contactRoutes)

app.listen(3002, () => {

    console.log("server is up")
})
