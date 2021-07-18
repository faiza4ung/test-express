const express       = require('express')
const router        = express.Router()
const { 
    daftarUser, 
    loginUser 
}= require('../controllers/user.controllers')

router.post('/daftar', daftarUser)
router.post('/login', loginUser)

module.exports      = router