const user = require('../models/user.models')

exports.daftarUser = (req,res)=>{
    const {username, email,password}= req.body

    const User = new user({
        username: username,
        email: email,
        password: password,
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