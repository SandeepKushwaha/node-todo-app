const ToDoLists = require('../models/todo_list');

module.exports.index = function (request, response) { 
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
module.exports.update = function (request, response) {
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