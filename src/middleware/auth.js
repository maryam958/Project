import jwt from "jsonwebtoken";
import qDB from '../../DB/connection.js';

// Roles
export const roles={
    Admin:"Admin",
    Technician:"Technician", 
}


export const auth = (acceptedRoles = [roles.Admin]) => {
  return async (req, res, next) => {
    const { authorization } = req.headers;
    console.log({ authorization });
    console.log(acceptedRoles);
    // if doesnot start with Bearer
    if (!authorization?.startsWith(process.env.BearerKey)) {
      next(new Error("In-valid Bearer key", { cause: 400 }));
    } else {
      const token = authorization.split(process.env.BearerKey)[1];
      console.log("token",token);
      const decoded = jwt.verify(token, process.env.tokenSignature);
      console.log("decoded",decoded);
      if (!decoded?.id || !decoded?.isLoggedIn) {
        console.log(decoded);
        next(new Error("In-valid token payload", { cause: 400 }));
      } else {
          const user = await qDB.execute(`SELECT id,email,username,role FROM users where id='${decoded.id}'`,(err,result)=>{
            //  req.user =decoded.user
            //  console.log("decoded.user",decoded.user);
            if(err){
                res.json({message:"SQL Error",err})
            }
            else{
              if (!user) {
                next(new Error("Not register user", { cause: 404 }));
              } 
              else {
                const userRow = result[0];
                console.log(userRow);
                if(userRow){
                  const userRole =userRow.role;
                  console.log(userRole);
                  console.log("acc",acceptedRoles.includes(userRole));
                  if (acceptedRoles.includes(userRole) ==false) {
                    req.user = userRow;
                    console.log("usserr",userRow);
                    next();
                  } else {
                    next(new Error("Not authorized user", { cause: 403 }));
                  }
                }
               
              }
            }
          })

     
      }
    }
  };
};


