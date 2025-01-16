

// Task router 
const {auth} = require("../middlware/Authmidle")
const express = require("express")
const router = express.Router()

const {createTask,addMemberToTask,deleteTask, getAllTaskData, getAllDataMyTask, createMytask, getMyTaskDetail} = require("../controller/Task");

router.post("/create-task",auth,createTask);
router.post("/add-member-to-task",auth,addMemberToTask);
router.post("/delete-task",auth,deleteTask);
router.post("/get-all-task-data",auth,getAllTaskData)

// my-task route

router.post("/get-all-my-task-data",auth,getAllDataMyTask)
router.post("/create-my-task",auth,createMytask);
router.post("/get-my-task-detail",getMyTaskDetail)

module.exports = router;
