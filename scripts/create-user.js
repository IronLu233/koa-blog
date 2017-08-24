const bcrypt = require('bcryptjs')
const readlineSync = require('readline-sync')
require('../models')

    const userName = readlineSync.question('请输入账号\n')
    const password = readlineSync.question('请输入密码\n')
    const { User } = global
    const user = new User({ userName, password })
    user.save().then(() => {
        console.log('创建成功')
        process.exit()
    })
   