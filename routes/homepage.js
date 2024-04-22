const express = require('express');
const router = express.Router();


// Define the route handler for the homepage
router.get('/', (req,res) => {
    //Render the homepage view
    res.render('homepage', {title: 'Homepage'});
});

//Export the router
module.exports = router;
