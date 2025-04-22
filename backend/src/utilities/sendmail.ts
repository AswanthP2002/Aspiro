import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

export const sendEmail = async (to : string, subject : string, content : string) => {
    console.log('email', process.env.NODEMAILER_EMAIL)
    console.log('password', process.env.NODEMAILER_PASSWORD)
    const transport = nodemailer.createTransport({
        service:"gmail",
        port:587,
        secure:false,
        requireTLS:true,
        auth:{
            user:process.env.NODEMAILER_EMAIL,
            pass:process.env.NODEMAILER_PASSWORD
        }
    })

    try {
        const emailInfo = await transport.sendMail({
            from:process.env.NODEMAILER_EMAIL,
            to:to,
            subject:subject,
            html:content
        })

        console.log("Email send :from the nodemailer ~ sendmail.ts")
        return emailInfo.messageId
    } catch (error : any) {
        console.log('Error occured while sending email to the user', error)
        return new Error(error.message)
    }
}