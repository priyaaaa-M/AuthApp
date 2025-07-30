const bcrypt = require('bcrypt');

const User = require('../model/User');
const jwt = require("jsonwebtoken");

require("dotenv").config();


exports.login = async (req, res) => {

     try {
          //data fetch 
          const { email, password } = req.body;

          //validation on email and password 
          if (!email || !password) {
               return res.status(400).json({
                    success: false,
                    message: 'Please fill all the details  carefully',
               });
          }

          let user = await User.findOne({ email });
          //if not a registerd user 
          if (!user) {
               return res.status(401).json({
                    success: false,
                    message: 'User is not registered',
               })
          }


          const payload = {
               email: user.email,
               id: user._id,
               role: user.role,
          }


          //verify password & generate a JWT token 

          if (await bcrypt.compare(password, user.password)) {
               //password match
               let token = jwt.sign(payload,
                    process.env.JWT_SECRET, {
                    expiresIn: "2h",
               }
               );


               user = user.toObject();
               user.token = token;
               user.password = undefined;

               //cookie
               const options = {
                    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
                    httpOnly: true,
               }

               res.cookie("priyaa", token, options).status(200).json({
                    success: true,
                    token,
                    user,
                    message: 'User Logged in Successfully',

               })







          } else {
               // password do not match
               return res.status(403).json({
                    success: false,
                    message: 'password Incorrect',
               })
          }


     }
     catch (error) {
          console.error("Login error:", error); // <-- ADD THIS LINE
          return res.status(500).json({
               success: false,
               message: "Internal Server Error, please try again later",
          });
     }

}


