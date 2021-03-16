const socketio = require('socket.io')
const { getChat,
        insertChat,
        getFriend } = require('./model')
const { notFound,
        failed,
        success } = require('../helper/response')
const moment = require('moment') 
const response = require('../helper/response')

module.exports = (server) => {
    const io = socketio(server, {
        cors: {
          origin: '*'
        }
      })      
      io.on('connection', (socket) => {

        socket.on('joinRoom', (roomId)=>{
            socket.join(roomId)
        }),

        //Get Friend
        socket.on('allFriend', (data)=>{
          if (!data.filter) {
            const newData = {
              id : data.id,
              filter : '%'
            }
            getFriend(newData).then((response)=>{
              io.to(data.roomId).emit('resGetFriend', response)
            }).catch((err)=>{
              console.log(err)
            })
          } else {
            getFriend(data).then((response)=>{
              io.to(data.roomId).emit('resGetFriend', response)
            }).catch((err)=>{
              console.log(err)
            })      
          }
        })

        //Get Chat
        socket.on('getListChat', (data)=>{
          const newData = {
            user_id: data.user,
            target_id: data.target,
          }
          getChat(newData).then((response)=>{
            // console.log(response)
            io.to(data.roomId).emit('resGetListChat', response)
          })
        }),

        //Send Message
        socket.on('sendMessage', (data)=>{
            const newData = {
                user_id: data.user,
                target_id: data.target,
                message: data.msg
            }
            insertChat(newData).then((response)=>{
              getChat(newData).then((response)=>{
                // console.log(response)
                io.to(response[0].from_roomId).emit('resGetListChat', response)
                io.to(response[0].target_roomId).emit('resGetListChat', response)
              }).catch((err)=>{
                //error take message data
                console.log(err)
              })
            }).catch((err)=>{
              //error insert chat
              console.log(err)
            })
        })
      })
}