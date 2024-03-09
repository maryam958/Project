import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../../services/sendEmail.js";
import { asyncHandler } from "../../../services/asyncHandler.js";
import { nanoid } from "nanoid"
import qDB from '../../../../DB/connection.js'

export const signUp = asyncHandler(async (req, res, next) => {
  const { username, email, password,role} = req.body;
  const user = qDB.execute(`SELECT email FROM users WHERE email = '${email}'`,(err,result)=>{

    if(err){
      res.json({message:"sql error",err})
    }
    else{
      if (result.length > 0) {
        next(new Error("This email already register", { cause: 409 }));
      } 
      else {
        let hashedPassword = bcrypt.hashSync(
          password,
          parseInt(process.env.SALTROUND)
        );
        
        let addUser = qDB.execute(`INSERT INTO users(username, email, password,role) VALUES ('${username}','${email}','${hashedPassword}','${role}')`,(err,result)=>{
          if (err){
            res.json({message:"sql error",err})
        }
        else{
            res.status(200).json({message:"Done",result})
        }
      })}
     
 } })
    
    
})
   


export const logIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  
  qDB.execute('SELECT * FROM users WHERE email = ?', [email], (err, rows) => {
    if (err) {
      return next(err); 
    }

    if (rows.length === 0) {
      return next(new Error("You have to register first", { cause: 404 }));
    }
    const user = rows[0];
    const matched = bcrypt.compareSync(password, user.password);
    if (matched) {
        const token = jwt.sign(
          { id: user.id, isLoggedIn: true },
          process.env.tokenSignature,
          { expiresIn: '2d' } 
        );
        return res.status(200).json({ message: "Welcome", token });
      }
    } 
  )});






