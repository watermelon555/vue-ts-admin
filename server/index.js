const express = require('express')
const app = express()
// 创建数据库连接
const mysql = require('mysql')
app.listen(5000, ()=>{
    // 打印一下
    console.log('http://127.0.0.1:5000')
})

const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'test'
})
// 祖册 解析表单的body-parser
const bodyParser = require('body-parser')

