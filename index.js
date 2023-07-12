const express = require('express');
const path = require('path');
const app = express();
const port = 8000;

// use express router
app.use('/', require('./routes/index'));

// use ejs views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// accessing static files
app.use(express.static('assets'));

app.listen(port, function (error) {
    if (error) {
        console.log(`Error in running the server: ${error}`);
    }

    console.log(`Server is running on port: ${port}`);
});