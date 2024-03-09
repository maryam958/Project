import mysql from 'mysql2'

const connectDB = mysql.createConnection({
    host:'127.0.0.1',
    database:'mytask',
    user:'root',
    password:''


})

export default connectDB;