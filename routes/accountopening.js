const express = require('express');
const router = express.Router();
const axios = require('axios');

require('dotenv').config();

// Define global variable to store form data
let formData = {};

// Define route handler for the account opening page
router.get('/account-opening', (req, res) => {
    // Render the account opening view
    res.render('accountForm', { title: 'Account Opening' });
});

// Define route handler for form submission
router.post('/submit-account-form', async (req, res) => {
    try {
        formData = req.body;

        // Retrieve workflow token and secret from environment variables
        const workflowToken = process.env.WORKFLOW_TOKEN;
        const workflowSecret = process.env.WORKFLOW_SECRET;
        const basicAuthString = Buffer.from(`${workflowToken}:${workflowSecret}`).toString('base64');

        // Make API call to Alloy endpoint with authentication
        const response = await axios.post('https://sandbox.alloy.co/v1/evaluations', formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${basicAuthString}`
            }
        });

        console.log('Alloy API response: ', response.data);

        // Redirect to the outcome route with the outcome as a query parameter
        const outcome = response.data.summary.outcome.toLowerCase();
        res.redirect(`/outcome?outcome=${outcome}`);
    } catch (error) {
        // Handle errors
        console.error('Error making API call to Alloy:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Define route handler to get form data
router.get('/get-form-data', (req, res) => {
    res.json(formData);
});

// Define route handler for displaying different pages based on outcome
router.get('/outcome', (req, res) => {
    const outcome = req.query.outcome;

    // Render different pages based on the outcome
    switch (outcome) {
        case 'approved':
            res.render('approvedPage', { title: 'Application Approved' });
            break;
        case 'manual review':
            res.render('manualReviewPage', { title: 'Manual Review Required' });
            break;
        case 'denied':
            res.render('deniedPage', { title: 'Application Denied' });
            break;
        default:
            res.status(404).send('Outcome not found');
    }
});

// Export the router
module.exports = router;
