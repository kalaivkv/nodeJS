const db = require('../config/db');

class FormModel {
    static insertForm(name, email, message, callback) {
        const sql = 'INSERT INTO forms (name, email, message) VALUES (?, ?, ?)';
        db.query(sql, [name, email, message], callback);
    }
}

module.exports = FormModel;
