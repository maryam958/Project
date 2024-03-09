import nodemailer from "nodemailer"

export async function sendEmail(dest,subject,message,attachments=[]){
    let transporter =nodemailer.createTransport({
        service:'gmail',
        auth:{
            user: process.env.nodeMailerEmail, // generated ethereal user
            pass: process.env.nodeMailerPassword,
        }
    })

    let info=await transporter.sendMail({
        from:`"GeekyAir"<${process.env.nodeMailerEmail}>`,
        to:dest,
        subject,
        html:message,
        attachments
    });
    return info

}