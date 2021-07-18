const user = require('../models/user.models')
const bcrypt = require('bcryptjs')

exports.daftarUser = async (req, res)=>{
    const {username, email,password}= req.body

    const hashPassword = await bcrypt.hash(password, 8) 
    const User = new user({
        username: username,
        email: email,
        password: hashPassword,
    })

    User.save()
    .then(result =>{
        res.status(201).json({
            message: 'User berhasil ditambahkan',
            data: result
        }); 
    }).catch(err => {
        console.log('err: ', err);
    });
}

exports.loginUser = async (req, res) => {
    return res.status(200).json({
        message: 'berhasil'
    })
}