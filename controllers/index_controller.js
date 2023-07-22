const TODOLists = require('../models/todo_list');
const ToDoLists = require('../models/todo_list');

module.exports.indexPage = function (request, response) {
    // fetching list data
    ToDoLists.find({})
        .then(todo => {
            // console.log('data fatched::', todo);
            return response.render('index', {
                title: 'TODO App',
                todoList: todo,
            });
        })
        .catch(error => {
            console.log('Error in fetching data::', error);
            return response.status(500).json({ error: 'Internal server error' });
        });
};

// create todo list
module.exports.create = function (request, response) {
    const dueDate = request.body.date;
    const discription = request.body.desc;
    const category = request.body.category;
    console.log(request.body);

    ToDoLists.create({ discription, category, dueDate })
        .then(data => {
            console.log('list created ::', data);
            return response.redirect('/');
        })
        .catch(error => {
            console.log('Error while creating list ::', error);
            return response.status(500).json({ error: 'Internal server error' });
        });
};

// delete todo list
module.exports.delete = function (request, response) {
    const ids = request.query.id;
    const idArr = ids.split(',');
    const deletePromises = [];

    for (let i = 0; i < idArr.length; i++) {
        // delete item and add the promise to the deletePromises array
        deletePromises.push(ToDoLists.findByIdAndDelete(idArr[i]));
    }

    Promise.all(deletePromises)
        .then(() => {
            // All items have been deleted successfully
            // Set cache-control header to force the page to refresh
            response.set('Cache-Control', 'no-store');
            return response.redirect('/');
        })
        .catch((error) => {
            console.log('Error in deleting item ::', error);
            // Handle the error if necessary
            return;
        });
}

// update page
module.exports.updatePage = function (request, response) {
    ToDoLists.findById(request.query.id)
        .then(listItem => {
            console.log("getting data for ::", request.query.id);
            console.log(listItem);
            return response.render('edit_todo', {
                title: 'Edit TODO',
                todoItem: listItem
            });
        })
        .catch(error => {
            console.log('Error::', error);
            // Handle the error, e.g., render an error page or redirect
        });
}

// update todo
module.exports.edit = function (request, response) {
    const editTodoId = request.query.id;
    const editDiscription = request.body.desc;
    const editCategory = request.body.category;
    const editDueDate = request.body.date;

    ToDoLists.updateOne(
        { _id: editTodoId },
        {
            $set: {
                discription: editDiscription,
                category: editCategory,
                dueDate: editDueDate
            }
        }
    )
        .then(todoData => {
            console.log('updated data::', todoData);
            return response.redirect('/');
        })
        .catch(error => {
            console.log('Error while updating::', error);
            // Handle the error, e.g., render an error page or redirect
        });
}