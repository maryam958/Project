import joi from "joi";



export const AddUser = {
    body:joi
    .object()
    .required()
    .keys({
        username: joi.string().required().min(2).max(20),
        email: joi
          .string()
          .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
        password: joi
          .string()
          .pattern(new RegExp("^[A-Z][a-z0-9]{3,8}$"))
          .required().messages({
            "string.pattern.base":"Not matching pattern"
          }),
        role: joi.string().valid('admin','technician','client').insensitive().required()
    
    })
 
}
