const express = require('express');
const path = require('path');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// set up middleware that parses all the urlencoded bodies.
app.use(express.urlencoded({
    extended: true
}));

app.use(expressLayouts);

// extract style and script form sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


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