const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const path = require('path');
const app = express();

// set the permissive content security policy
app.use((req,res,next) => {
    res.setHeader('Content-Security-Policy', "default-src 'self' 'unsafe-inline'");
    next();
})

// Parse URL-encoded and JSON request bodies
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Specify directory where Pug templates are located
app.set('view engine', 'pug')
app.set('views', './views');


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Import and use route modules
const homepageRouter = require('./routes/homepage');
const accountOpeningRouter = require('./routes/accountopening.js');
const approvedRouter = require('./routes/approved');
const deniedRouter = require('./routes/denied');
const reviewRouter = require('./routes/review');

app.use('/', homepageRouter);
app.use('/', accountOpeningRouter);
app.use('/', approvedRouter);
app.use('/', deniedRouter);
app.use('/', reviewRouter);
