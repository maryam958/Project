import mysql from 'mysql2'

const connectDB = mysql.createConnection({
    host:'localhost',
    database:'mytask',
    user:'root',
    password:''


})

export default connectDB;