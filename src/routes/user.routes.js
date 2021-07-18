const express       = require('express')
const router        = express.Router()
const { daftarUser, loginUser, getSingleUser }= require('../controllers/user.controllers')
const { validasiCek, validasiDaftar, validasiLogin } = require('../validation/validation')
const middleware = require('../middleware')

router.post('/daftar', validasiDaftar, validasiCek, daftarUser)
router.post('/login', validasiLogin, validasiCek, loginUser)
router.get('/user', middleware, getSingleUser)

module.exports      = router