const {
    getAllTodo,
    getAllTodoWithPaginationAndSearch,
    insertTodo,
    getTodoById,
    updateStatusOfTodoById,
    updateTodo,
    deleteTodoById
} = require('../service/todoService');
const { getAllPriorities } = require('../service/priorityService');
const { getAllStatuses } = require('../service/statusService');
const { verifyToken } = require('../middleware/JWTAction');
const { getUserWithEmail } = require('../service/userService');
const moment = require('moment');

const getAllTodoPage = async (req, res) => {
    let title = req.query.title;
    let statusId = req.query.statusId;
    let listTodos;
    let listStatuses = await getAllStatuses();

    if (title === undefined) {
        title = '';
    };

    if (statusId === undefined) {
        statusId = '';
    }

    try {
        if (req.query.page && req.query.limit) {
            let page = +req.query.page;
            let limit = +req.query.limit;
            listTodos = await getAllTodoWithPaginationAndSearch(page, limit, title.trim(), statusId);

            return res.render('todo/list.ejs', {
                listTodos: listTodos.todos,
                title,
                statusId,
                totalPages: listTodos.totalPages,
                limit: limit,
                page: page,
                offset: listTodos.offset,
                listStatuses
            });
        };
        listTodos = await getAllTodoWithPaginationAndSearch(1, 2, title.trim(), statusId);

        return res.render('todo/list.ejs', {
            listTodos: listTodos.todos,
            title,
            statusId,
            totalPages: listTodos.totalPages,
            limit: 2,
            page: 1,
            offset: listTodos.offset,
            listStatuses
        });
    } catch (error) {
        console.log(error);
    }
};

const getCreateTodoPage = async (req, res) => {

    let listPriorities = await getAllPriorities();

    return res.render('todo/create.ejs', { listPriorities });
};

const createTodo = async (req, res) => {
    let cookies = req.cookies.jwt;
    let decoded = verifyToken(cookies);
    let emailUser = decoded.email;
    let user = await getUserWithEmail(emailUser);
    let todo = req.body;

    try {
        let error = await insertTodo(todo, user);

        if (error) {
            return res.redirect('/todo/list?msg=Create-Todo-failed');
        }

        return res.redirect('/todo/list?msg=Create-Todo-succeed');
    } catch (error) {
        console.log('Create Error: ', error);
    };
};

const editStatusOfTodo = async (req, res) => {
    let todo = req.body;

    try {
        let error = await updateStatusOfTodoById(todo);
        if (error) {
            return res.redirect('/todo/list', { msg: 'Update status failed!' });
        }
        return res.redirect('/todo/list', { msg: 'Update status succeed!' });
    } catch (error) {
        console.log('Edit status Error: ', error);
    }
};

const getEditTodoPage = async (req, res) => {
    let todoId = req.params.todoId;

    try {
        let todo = await getTodoById(todoId);
        let dueDate = moment(todo.dueDate).format('YYYY-MM-DD h:mm:ss');
        let listPriorities = await getAllPriorities();

        return res.render('todo/edit.ejs', { todo, listPriorities, dueDate });
    } catch (error) {
        console.log(error);
    };
};

const editTodo = async (req, res) => {
    console.log(req.body);
    let todo = req.body;

    try {
        let error = await updateTodo(todo);

        if (error) {
            return res.redirect('/todo/list?msg=Update-Todo-failed');
        };

        return res.redirect('/todo/list?msg=Update-Todo-succeed');
    } catch (error) {
        console.log(error);
    };
};

const deleteTodo = async (req, res) => {
    let todoId = req.params.todoId;

    try {
        let error = await deleteTodoById(todoId);

        if (error) {
            return res.redirect('/todo/list?msg=delete-todo-failed');
        };

        return res.redirect('/todo/list?msg=delete-todo-succeed');
    } catch (error) {
        console.log('Delete Error: ', error);
    }
};

module.exports = {
    getAllTodoPage,
    getCreateTodoPage,
    createTodo,
    editStatusOfTodo,
    getEditTodoPage,
    editTodo,
    deleteTodo
}