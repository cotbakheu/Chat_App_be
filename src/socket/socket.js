const socketio = require('socket.io')
const { getChat,
        insertChat } = require('./model')
const { notFound,
        failed,
        success } = require('../helper/response')
const { format } = require('../config/mysql')

module.exports = (server) => {
    const io = socketio(server, {
        cors: {
          origin: '*'
        }
      })      
      io.on('connection', (socket) => {
        socket.on('joinRoom', (id)=>{
            socket.join(id)
        }),
        socket.on('getListChat', (user)=>{
            getChat(user).then((response)=>{
                if (response.length === 0) {
                    io.to(user.id_from).emit('resListChat', 'There is no message')
                } else {   
                    io.to(user.id_from).emit('resListChat', response)
                }
            }).catch((err)=>{
                console.log(err)
            })
        }),
        socket.on('sendMessage', async(data)=>{
            const onInsert = await insertChat(data);
            const newData = {
                id_from: data.from,
                id_to: data.to
            }
            getChat(newData).then((response)=>{
                // if (response.length === 0) {
                //     io.to(data.from).emit('resListChat', 'There is no message')
                //     io.to(data.to).emit('resListChat', 'There is no message')
                // } else {   
                    io.to(data.from).emit('resListChat', response)
                    io.to(data.to).emit('resListChat', response)
                // }
            }).catch((err)=>{
                console.log(err)
            })
        })
      })
}