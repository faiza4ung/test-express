const express       = require('express')
const router        = express.Router()
const { daftarUser, loginUser }= require('../controllers/user.controllers')
const { validasiCek, validasiDaftar, validasiLogin } = require('../validation/validation')

router.post('/daftar', validasiDaftar, validasiCek, daftarUser)
router.post('/login', validasiLogin, validasiCek, loginUser)

module.exports      = router