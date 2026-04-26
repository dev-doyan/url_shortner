import {pool} from '../config/db.js'
import {nanoid} from "nanoid"


const create=async(url,expires_at,customcode)=>{
  if(!expires_at){
    expires_at=null
  }else{
    expires_at=expires_at
  }

  if(!customcode){
const code =nanoid(6);
customcode=code;
  }else{
    customcode=customcode
  }



    const [rows]=await pool.query(` insert into url_data(url,custom_code,created_at,expires_at,clicks)
        values(?,?,NOW(),?,0)
        `,[url,customcode,expires_at])

        return customcode;
}



const geturl=async(code)=>{

    try {
        const[rows]= await pool.query(`select * from url_data where custom_code=?`,[code])
       return rows[0].url;
       
    } catch (error) {
        console.log(error)
    }
    
}

const deleteurl=async(code)=>{
  const [rows]= await pool.query(` delete from url_data where custom_code=?`,[code]);
  return rows.affectedRows;
}



 const getallurl=async()=>{
  const[rows]= await pool.query(`select * from url_data`);
 
  return rows;
  
 }


 const incrementclicks=async(code)=>{
  const[rows]=await pool.query(`UPDATE url_data SET clicks = clicks + 1 WHERE custom_code = ?`,[code]);
  console.log(rows);
  return rows.affectedRows;
 }



 const update_expiry=async(code,expires_at)=>{
  const[rows]=await pool.query(`update url_data set expires_at=? where custom_code=?`,[expires_at,code]);
  return rows.affectedRows;
 }


 export {create, geturl, deleteurl, getallurl, incrementclicks, update_expiry}