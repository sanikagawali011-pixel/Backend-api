const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth');


const registerUser = async (req, res) => {

    try {
        const { name, email, password, mobile_number, age, roll_no } = req.body

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            mobile_number,
            age,
            roll_no
        })

        await user.save();

        res.status(201).json(user)

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message
        });
    }

};

const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                msg: "email and password are required"
            })

        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                msg: "invalid password"
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            "sanika@11",
            {
                expiresIn: "1d"
            }
        )

        res.status(200).json({
            msg: "login successful",
            token
        })

    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
}

const getUserDetails = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findById(userId);
        return res.status(200).json({
            "msg": "Success",
            user: {
                user_name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        return res.status(400).json({
            "msg": "Error"
        })
    }
}

const deleteUserDetails = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({
                "msg": "User not found"
            })
        }


        return res.status(200).json({
            "msg": "Success"
        })

    } catch (error) {
        return res.status(400).json({
            "msg": "Error",
            "error": error.message
        })
    }
}

const updateUserDetails = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findByIdAndUpdate(
            userId,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        )
        if (!user) {
            return res.status(404).json({
                "msg": "User not found"
            })
        }

        return res.status(200).json({
            "msg": "Success"
        })

    } catch (error) {
        return res.status(400).json({
            "msg": "Error",
            "error": error.message
        })
    }
}

const changePassword = async (req, res) => {
    try {
        const { current_pass, new_pass } = req.body;
        const { id } = req.user;

        if (!current_pass || !new_pass) {
            return res.status(400).json({
                message: "both fields are required"
            })
        }

        const user = await User.findById(id);

        if (!user) {
                return res.status(404).json({
                    message: "User Not Found"
                });
        }

        const isMatch = await bcrypt.compare(
                current_pass,
                user.password
        )

        if (!isMatch) {
                return res.status.json({
                    message: "Current password is incorrect"
                })
        }
        console.log(user);
        const hashedPassword = await bcrypt.hash(new_pass, 10);
        user.password=hashedPassword
        await User.findByIdAndUpdate(
            id,
            {password:hashedPassword}
            
        );
        console.log(user);
        return res.status(200).json({
            message: "Password Updated successfully"
        });

        }
    catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            message : error.message
        });
    }
}

module.exports = { registerUser, login, getUserDetails, deleteUserDetails, updateUserDetails, changePassword };