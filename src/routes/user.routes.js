const express       = require('express')
const router        = express.Router()
const { daftarUser }= require('../controllers/user.controllers')

router.post('/daftar', daftarUser)

module.exports      = router