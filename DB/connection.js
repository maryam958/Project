import mysql from 'mysql2'

const connectDB = mysql.createConnection({
    // host:'127.0.0.1',
    // database:'mytask',
    // user:'root',
    host: process.env.DB_HOST, 
    user: process.env.DB_USERNAME, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,



})

export default connectDB;