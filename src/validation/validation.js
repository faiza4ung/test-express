const { check, validationResult } = require('express-validator')

exports.validasiCek = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(404).json({
            status: false,
            message: errors.array()[0].msg
        })
    }
    next()
}

exports.validasiDaftar = [
    check('username', 'username tidak boleh kosong').notEmpty(),
    check('email', 'email tidak boleh kosong').notEmpty().isEmail().withMessage('email yang anda masukan tidak valid'),
    check('password', 'password tidak boleh kosong').notEmpty().isLength({min: 6}).withMessage('password minimal 6 karakter')
]