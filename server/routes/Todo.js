
const express = require("express");
const router = express.Router();

const {createTodo,editTodo,deleteTodo, markCompleted} = require("../controller/Todos")

router.post("/create-todo",createTodo);
router.post("/edit-todo",editTodo);
router.delete("/delete-todo",deleteTodo)
router.post("/mark-complete-todo",markCompleted)

module.exports = router