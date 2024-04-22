const express = require('express');
const router = express.Router();


// Define the route handler for the homepage
router.get('/', (req,res) => {
    //Render the approved view
    res.render('approvedForm', {title: 'approved'});
});

//Export the router
module.exports = router;