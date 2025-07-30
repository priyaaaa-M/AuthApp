// auth ,isStudent ,isAdmin, isInstructor


const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to check if the user is authenticated



exports.auth = (req, res, next) => {
    try {
        // Try to get token from headers (preferred) or body
        // let token;

        // // // Option 1: From Authorization Header
        // const authHeader = req.headers.authorization;
        // if (authHeader && authHeader.startsWith("Bearer ")) {
        //     token = authHeader.split(" ")[1]; // Bearer <token>
        // }

        // // Option 2: From body (not recommended, but allowed here for flexibility)
        // if (!token && req.body.token) {
        //     token = req.body.token;
        // }


        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer", " ");
        // const token = req.cookies.priyaa;
        // console.log("cookie se aaya hu : =>   ", token);
        // If token still not found
        if (!token || token == undefined) {
            return res.status(401).json({
                success: false,
                message: "Token missing. Please login first.",
            });
        }



        // Verify the token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user info to request object
            console.log("Decoded JWT Payload:", decoded);

            req.user = decoded; // contains payload like { id, email, role }

            next(); // continue to next middleware or route
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token. Please login again.",
            });
        }

    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong during authentication.",
        });
    }
};



//isStudent middleware

exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: " This is STUDENT..You are not authorized to access this route",
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'User Role is notb match',
        })

    }
}




// isAdmin middleware

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "..THis is ADMIN ...You are not authorized to access this route",
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'User Role is notb match',
        })

    }
}




// isInstructor middleware

exports.isInstructor = (req, res, next) => {
    try {
        if (req.user.role !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: "...This is INSTRUCTOR  You are not authorized to access this route",
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'User Role is not match',
        })

    }
}


