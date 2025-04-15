const express = require('express');
const { submitForm } = require('../controllers/formController');

module.exports = (wss) => {
    const router = express.Router();
    router.post('/submit', (req, res) => submitForm(req, res, wss));
    return router;
};
