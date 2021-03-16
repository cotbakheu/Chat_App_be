const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const { modelReg,
        modelCheck,
        modelUpdate,
        modelDetail,
        mdDeletePhoto,
        modelAllUsers } = require('../model/users');

const { failed,
    success,
    notFound } = require('../helper/response');

module.exports = {
    //user login
    login: (req, res) => {
        const body = req.body;
        modelCheck(body.email).then(async (response) => {
            if (response.length === 1) {
                const checkPassword = await bcrypt.compare(body.password, response[0].password);
                if (checkPassword) {
                    const userData = {
                        id: response[0].id,
                        email: response[0].email
                    };
                    const token = jwt.sign(userData, process.env.JWT_SECRET);
                    success(res, 
                            {   token, 
                                id: response[0].id, 
                                username: response[0].username,
                                name: response[0].name,
                                room_id: response[0].room_id
                            }, 
                            {}, 
                            'login succesful')
                } else {
                    failed(res, "Wrong Password", {})
                }
            } else {
                failed(res, "Email not valid", {})
            }
        }).catch((err) => {
            failed(res, "Server Error", {})
        })
    },
    //user register
    userReg: (req, res) => {
        const body = req.body;
        // const name = body.email.match(/^([^@]*)@/)[1];
        const roomId = Math.random() * 10000
        const data = {
            email: body.email,
            password: body.password,
            username: body.username,
            name: body.username,
            image: 'default_photo.png',
            room_id: Math.ceil(roomId),
            phone: '+62',
            lat: '-6.175175158426828', 
            lng: '106.6788734408048'
        }
        modelCheck(body.email).then(async (response) => {
            if (response.length >= 1) {
                failed(res, "Email has been registered")
            } else {
                if (!body.email || !body.password || !body.username) {
                    failed(res, 'Empty Field, All Field Required')
                } else {
                    const salt = await bcrypt.genSalt();
                    const password = await bcrypt.hash(body.password, salt);
                    const user = {...data, password };
                    modelReg(user).then(() => {
                        success(res, user, {}, 'Register Success')
                    }).catch((err) => {
                        failed(res, "Server Error", err.message)
                    });
                }
            }
        }).catch((err) => {
            failed(res, "Server Error, Check email", err.message)
            console.log(err)
        })
    },
    //update User
    updateUser: async (req, res) => {
        try {
            console.log('disini')
            const body = req.body
            const id = req.params.id
            const detail = await modelDetail(id)
            // const data = {...body, image: req.file.filename};
            if (req.file) {
                const data = { ...body, image: req.file.filename };
                console.log(data)
                if (detail[0].image === 'default_photo.png') {
                    modelUpdate(data, id)
                        .then((response) => {
                            success(res, response, {}, 'Update User success')
                        }).catch((err) => {
                            failed(res, err.message)
                        })
                } else {
                    const path = `./public/images/${detail[0].image}`
                    fs.unlinkSync(path)
                    modelUpdate(data, id)
                        .then((response) => {
                            success(res, response, {}, 'Update User success')
                        }).catch(() => {
                            failed(res, err.message)
                        })
                }
            } else {
                    modelUpdate(body, id)
                        .then((response) => {
                            success(res, response, {}, 'Update User success')
                        }).catch((err) => {
                            failed(res, err.message)
                        })
            }
        } catch (error) {
            failed(res, error.message)
        }
    },
    //get Detail User
    getDetailUser: (req, res) => {
        try {
            const id = req.params.id
            modelDetail(id).then((response) => {
                if (response.length > 0) {
                    success(res, response, {}, 'Get detail user success')
                } else {
                    notFound(res, "Data unavailable", response)
                }
            }).catch((err) => {
                failed(res, 'Internal server error', err.message)
            })
        } catch (error) {
            failed(res, 'Internal server error', error.message)
        }
    },
    deletePhoto: (req, res) => {
        try {
            mdDeletePhoto(req.params.id).then(() => {
                modelDetail(req.params.id).then(result => {
                    if (result[0].image != 'default_photo.png') {
                        const path = `./public/images/${result[0].image}`
                        fs.unlinkSync(path)
                    }
                    success(res, 'Image deleted success')
                }).catch(err => {
                    failed(res, 'Internal server error', err.message)
                })
            }).catch((err) => {
                failed(res, 'Internal server error', err.message)
            })
        } catch (error) {
            failed(res, 'Internal server error', error)
        }
    },
    getAllUsers: (req,res)=> {
        const data = req.body;
        // console.log(data)
        modelAllUsers(data).then((response)=>{
            success(res, response, {}, 'Get all users success')
        }).catch((err)=>{
            failed(res, 'Internal server error')
        })
    }
}