const express = require('express');

const router = express.Router();
const todo = require("../controller/todo.controller");

router.post("/todo", todo.addTask);

router.get("/todo", todo.getTodo);

router.delete("/todo", todo.delTodo);

router.put("/todo/complete", todo.completeTodo);

router.put("/todo", todo.updateToDo);

module.exports = router;