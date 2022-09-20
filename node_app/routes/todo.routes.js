const express = require('express');

const router = express.Router();
const todo = require("../controller/todo.controller");

router.post("/todo/addTask", todo.addTask);

router.get("/todo/getTodoList", todo.getTodo);

router.delete("/todo/delTodo", todo.delTodo);

router.put("/todo/completeTodo", todo.completeTodo);

module.exports = router;