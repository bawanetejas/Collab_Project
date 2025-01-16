
const express = require("express");
const router = express.Router();
const {auth} = require("../middlware/Authmidle")
const {createTeam,addMember, getAllTeamData} = require("../controller/Team")


router.post("/create-team",auth,createTeam);
router.post("/add-member",auth,addMember)
router.post("/get-all-team-data",auth,getAllTeamData)

module.exports = router