const FormModel = require('../models/formModel');

const submitForm = (req, res, wss) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    FormModel.insertForm(name, email, message, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err });
        }

        const responseData = {
            id: result.insertId,
            name,
            email,
            message
        };

        wss.clients.forEach(client => {
            if (client.readyState === 1) {
                client.send(JSON.stringify({ message: 'New form submitted', data: responseData }));
            }
        });

        return res.status(201).json({ success: true, data: responseData });
    });
};

module.exports = { submitForm };
