const connection = require('../config/mysql');

module.exports = {
    //User Register
    modelReg: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO users SET ?`, data, (err, result) => {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(result);
                }
            })
        })
    },
    //Check Email
    modelCheck: (email) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM users WHERE email='${email}'`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    //updateUser
    modelUpdate: (data, id) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE users SET ? WHERE id=? `, [data, id], (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    //detail User
    modelDetail: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM users WHERE id='${id}'`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    mdDeletePhoto: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE users SET image = 'default_photo.png' WHERE id = '${id}'`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    modelAllUsers: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM users WHERE id != '${data.id}' AND username LIKE '%${data.filter}%'`, (err, result) => {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(result);
                }
            })
        })
    },
}