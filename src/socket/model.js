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
        const sql = `SELECT users.id, users.image, users.room_id, users.bio, users.username, users.name, users.phone, users.lng, users.lat FROM friend LEFT JOIN users ON (friend.user_id = users.id OR friend.target_id = users.id ) WHERE (users.id != ${data.id} AND (friend.target_id = ${data.id} OR friend.user_id = ${data.id})) GROUP BY users.id`
        return new Promise((resolve, reject)=>{
            connection.query(sql, (err, result)=>{
                if(err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    addFriend: (data) => {
        const sql = `INSERT INTO friend (user_id, target_id, status) VALUES ('${data.user_id}','${data.target_id}', '1'),('${data.target_id}','${data.user_id}', '1')`
        return new Promise ((resolve, reject)=> {
            connection.query(sql, (err, result)=>{
                if (err){
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    }
}