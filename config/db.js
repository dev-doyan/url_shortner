import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config();

const pool=mysql.createPool({
    port:process.env.DB_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    host:process.env.DB_HOST

})



const check_connection=async()=>{
    const connection =await pool.getConnection();
    console.log("database connected");
    connection.release();
}

export {pool,check_connection}
