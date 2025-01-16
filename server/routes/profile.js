const express = require("express")
const {auth} = require("../middlware/Authmidle")
const router = express.Router();

const {addData,changePassword}  = require("../controller/Profile")

router.post("/update-profile",addData);
router.post("/change-password",auth,changePassword);

module.exports = router