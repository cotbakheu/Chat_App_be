const connection = require('../config/mysql');

module.exports = {
    getChat: (user) => {
        return new Promise((resolve, reject)=> {
            connection.query(`SELECT chats.created_at, chats.user_id, chats.target_id, chats.message, user_target.name as target_name, user_target.image as target_image, user_from.room_id as from_roomId, user_target.room_id as target_roomId, user_target.id as target_id FROM chats LEFT JOIN users as user_from ON chats.user_id=user_from.id LEFT JOIN users as user_target ON chats.target_id = user_target.id 
            WHERE 
            (user_id='${user.user_id}' AND target_id='${user.target_id}') 
            OR 
            (user_id='${user.target_id}' AND target_id='${user.user_id}')`, (err, result)=>{
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
            connection.query(`INSERT INTO chats SET ?`, data, (err, result)=>{
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(result);
                }
            })
        })
    },
    getFriend: (data) => {
        const sql = `SELECT users.id As id, users.room_id, users.email, users.username, users.name, users.image, users.bio, users.phone, users.lat, users.lng, friend.status FROM users INNER JOIN (friend INNER JOIN friend friend1 ON friend.target_id = friend1.user_id) ON friend.user_id=${data.id} AND users.id<>${data.id} WHERE friend.status LIKE '%${data.filter}%' GROUP BY users.id`
        return new Promise((resolve, reject)=>{
            connection.query(sql, (err, result)=>{
                if(err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    }
}