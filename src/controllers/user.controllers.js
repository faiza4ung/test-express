require('dotenv').config()
const user = require('../models/user.models')
const bcrypt = require('bcryptjs')
const jWT = require('jsonwebtoken')

exports.daftarUser = async (req, res)=>{
    const {username, email,password}= req.body

    const emailUser = await user.findOne({email: email})
    const usernameUser = await user.findOne({username: username})

    if(usernameUser) {
        return res.status(404).json({
            status: false,
            message: 'username telah terdaftar, gunakan username lain'
        })
    }

    if(emailUser) {
        return res.status(404).json({
            status: false,
            message: 'email telah terdaftar, gunakan email lain'
        })
    }

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
    const { username, password } = req.body

    const cekLogin = await user.findOne({$or: [{username: username}, {email: username}]})
    console.log(cekLogin)
    if (cekLogin) {
        // jika username cocok maka cek password
        const passwordUser = await bcrypt.compare(password, cekLogin.password)
        if (passwordUser) {
            // jika password cocok maka lanjut proses ini
            const data = {
                id: cekLogin._id
            }
            const token = await jWT.sign(data, process.env.JWT_SECRET)
            return res.status(200).json({
                message: 'Token berhasil dibuat',
                data: {
                    username: username,
                    token: token,
                }
            })
        } else {
            return res.status(400).json({
                message: 'password salah',
            })
        }   
    } else {
        return res.status(400).json({
            message: 'email atau username tidak tersedia',
        })
    }
}