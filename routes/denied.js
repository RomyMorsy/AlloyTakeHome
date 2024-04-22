const express = require('express');
const router = express.Router();


// Define the route handler for the denial page
router.get('/', (req,res) => {
    //Render the denial view
    res.render('deniedForm', {title: 'Denial'});
});

//Export the router
module.exports = router;