const express       = require('express')
const router        = express.Router()
const { daftarUser, loginUser }= require('../controllers/user.controllers')
const { validasiCek, validasiDaftar } = require('../validation/validation')

router.post('/daftar', validasiDaftar, validasiCek, daftarUser)
router.post('/login', loginUser)

module.exports      = router