const express = require('express');
const todoRouter = express.Router();
const {
    getAllTodoPage,
    getCreateTodoPage,
    createTodo,
    editStatusOfTodo,
    getEditTodoPage,
    editTodo,
    deleteTodo
} = require('../controller/todoController');

todoRouter.get('/list', getAllTodoPage);
todoRouter.get('/create', getCreateTodoPage);
todoRouter.post('/create-submit', createTodo);
todoRouter.post('/update-status', editStatusOfTodo);
todoRouter.get('/update/:todoId', getEditTodoPage);
todoRouter.post('/update-submit', editTodo);
todoRouter.get('/delete/:todoId', deleteTodo);

module.exports = todoRouter;