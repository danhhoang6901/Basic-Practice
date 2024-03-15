const db = require('../models/index');
const { Op } = require('sequelize');

const getAllTodo = async () => {
    try {
        let listTodo = db.todo.findAll({
            include: [{
                model: db.status,
                attributes: [
                    'nameStatus'
                ]
            }, {
                model: db.priority,
                attributes: [
                    'namePriority'
                ]
            }, {
                model: db.user,
                attributes: [
                    'name'
                ]
            }],
            raw: true,
            nest: true
        });

        return listTodo;
    } catch (error) {
        console.log(error);
    };
};

const getAllTodoWithPaginationAndSearch = async (page, limit, search) => {
    let offset = (page - 1) * limit; //vi tri bat dau truy xuat
    let { count, rows } = await db.todo.findAndCountAll({
        offset: offset,
        limit: limit,
        include: [{
            model: db.status,
            attributes: [
                'id',
                'nameStatus'
            ]
        }, {
            model: db.priority,
            attributes: [
                'namePriority'
            ]
        }, {
            model: db.user,
            attributes: [
                'name'
            ]
        }],
        where: {
            [Op.or]: [{
                title: {
                    [Op.like]: '%' + search + '%'
                },
            }, {
                statusId: {

                }
            }]
        },
        raw: true,
        nest: true
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
        totalRows: count, //tong so row
        totalPages: totalPages, //tong so page
        todos: rows,
        offset: offset
    };

    return data;
};

const insertTodo = async (todo, user) => {
    try {
        await db.todo.create({
            title: todo.title, description: todo.description,
            dueDate: todo.dueDate, priorityId: todo.priorityId,
            statusId: 1, userId: user.id
        });
    } catch (error) {
        return error;
    };
};

const getTodoById = async (id) => {
    try {
        let todo = await db.todo.findOne({
            where: {
                id: id
            },
            raw: true,
            nest: true
        });

        return todo;
    } catch (error) {
        console.log(error);
    };
};

const updateStatusOfTodoById = async (todo) => {
    try {
        await db.todo.update({
            statusId: todo.statusId,
        }, {
            where: {
                id: todo.todoId
            }
        });
    } catch (error) {
        return error;
    };
};

const updateTodo = async (todo) => {
    try {
        await db.todo.update({
            title: todo.title, description: todo.description,
            dueDate: todo.dueDate, priorityId: todo.priorityId
        }, {
            where: {
                id: todo.id
            }
        });
    } catch (error) {
        return error;
    };
};

const deleteTodoById = async (todoId) => {
    try {
        await db.todo.destroy({
            where: {
                id: todoId
            }
        });
    } catch (error) {
        return error;
    };
};

module.exports = {
    getAllTodo,
    getAllTodoWithPaginationAndSearch,
    insertTodo,
    getTodoById,
    updateStatusOfTodoById,
    updateTodo,
    deleteTodoById
};