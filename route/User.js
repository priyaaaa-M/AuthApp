const express = require("express");
const router = express.Router();
const { signup } = require("../controller/Auth");
const { login } = require("../controller/login");

const { auth, isStudent, isAdmin, isInstructor } = require("../middleware/auth");

// User registration route
router.post("/login", login);
router.post("/signup", signup);


router.get("/test", auth, (req, res) => {
    res.json({
        success: true,
        message: "This is a test route",
    })
})
//Protacted route

router.get("/student", auth, isStudent, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the protected  route for studentStudent",
    });
})

router.get("/admin", auth, isAdmin, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the protected  route for admin",
    });
})

router.get("/Instructor", auth, isInstructor, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the protected  route for instructor",
    });
})


module.exports = router;