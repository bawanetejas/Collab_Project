
const express = require("express")

const router = express.Router();

const {sendresetotp, resetPassword} = require("../controller/ResetPass")
const {sendotp,login,signup}=require("../controller/Auth")

router.post("/signup",signup);
router.post("/login",login);
router.post("/sendotp",sendotp);


// *********** Reset Password

router.post("/verify-email",sendresetotp)
router.post("/reset-password",resetPassword)

module.exports = router;