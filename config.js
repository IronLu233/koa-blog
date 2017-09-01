const path = require('path')

module.exports = {
    session: {
        key: 'Are you ok?',
        maxAge: 86400000
    },
    port: 8000,
    salt: 10,
    keys: ['foo', 'bar'],
    multer: {
        dest: path.join(__dirname, 'public', 'uploads')
    }
}
