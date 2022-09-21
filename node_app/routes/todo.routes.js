const express = require('express');

const router = express.Router();
const todo = require("../controller/todo.controller");

router.post("/todo", todo.addTask);

router.get("/todo", todo.getTodo);

router.delete("/todo/:id", todo.delTodo);

router.put("/todo/complete/:id", todo.completeTodo);

router.put("/todo/:id", todo.updateToDo);

module.exports = router;