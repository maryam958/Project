import qDB from '../../../../DB/connection.js'
import { asyncHandler } from '../../../services/asyncHandler.js'

export const getAllUsers=asyncHandler(async(req,res,next)=>{
    qDB.execute(`select * from users`,(err,result)=>{
        if(err){
            res.json({message:"SQL Error",err})
        }
        else{
            res.json({message:"Done",result})
        }
    })
})


export const AddUser=(req,res)=>{
    let {username,email,password,role}=req.body;
    qDB.execute(`INSERT INTO users(username, email, password,role) VALUES 
    ('${username}','${email}','${password}','${role}')`,(err,result)=>{
        if(err){
            res.json({message:"sql error",err})
        }
        else{
            res.json({message:"Done",result})
        }
        
    })
   
}



export const UpdateUser=(req,res)=>{
    let {id}=req.params;
    let {password}=req.body;
    qDB.execute(`UPDATE users SET password=${password} WHERE id='${id}'`,(err,result)=>{
                console.log(err);
                if(err){
                    res.json({message:"sql error",err})
                }
                else{
                    res.json({message:"Done",result})
                }
                
            })
           
        }
        
    
    
    
    
export const DeleteUser=(req,res)=>{
    let {id}=req.params;
    qDB.execute(`DELETE FROM users WHERE id=${id}`,(err,result)=>{
        if(err){
            res.json({message:"sql error",err})
        }
        else{
            if(result.affectedRows){
                res.json({message:"Done",result})
            }
            else{
                res.json({message:"Invalid id",result})
            }
            
        }
        
    }
    
)}



export const getUserById=(req,res)=>{
    let {id}=req.params;
    qDB.execute(`SELECT * FROM users WHERE id=${id} `,(err,result)=>{
        console.log(err);
        if(err){
            res.json({message:"sql error",err})
        }
        else{
                
                res.json({message:"Done",result})
            }
            
            
        }
        
)}
    




export const searchByName =(req,res)=>{
    let {searchKey}= req.query;
    qDB.execute(`SELECT * FROM users WHERE username LIKE '${searchKey}'`,(err,result)=>{
    if (err){
        res.json({message:"sql error",err})
    }
    else{
        res.json({message:"Done",result})
    }




    })


}
