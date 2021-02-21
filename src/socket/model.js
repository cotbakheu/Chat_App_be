const connection = require('../config/mysql');

module.exports = {
    getChat: (user) => {
        return new Promise((resolve, reject)=> {
            connection.query(`SELECT chats.created_at, chats.from_id, chats.to_id, chats.message, user_from.username as from_name, user_from.image as from_image, user_from.id as from_id, user_to.id as to_id FROM chats LEFT JOIN users as user_from ON chats.from_id=user_from.id LEFT JOIN users as user_to ON chats.to_id = user_to.id 
            WHERE 
            (from_id='${user.id_from}' AND to_id='${user.id_to}') 
            OR 
            (from_id='${user.id_to}' AND to_id='${user.id_from}')`, (err, result)=>{
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(result);
                }
            })
        })
    },
    insertChat: (data) =>{
        return new Promise((resolve, reject)=>{
            connection.query(`INSERT INTO chats 
            (from_id, to_id, message) VALUES 
            ('${data.from}','${data.to}','${data.msg}')`, (err, result)=>{
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(result);
                }
            })
        })
    },
}