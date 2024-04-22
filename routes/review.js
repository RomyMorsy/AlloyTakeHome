const express = require('express');
const router = express.Router();


// Define the route handler for the review page
router.get('/', (req,res) => {
    //Render the review view
    res.render('reviewForm', {title: 'Review'});
});

//Export the router
module.exports = router;