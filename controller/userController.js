import User from "../model/userModel.js"
import nodemailer from "nodemailer";
import dotenv from "dotenv";


dotenv.config();

export const create = async (req , res) => {
    try {
        const userData = new User(req.body);
        const saveUser = await userData.save();
        res.status(200).json(saveUser);
        
    } catch (error) {
        res.status(500).json({ error: error.message || "Internal Server Error."});
    }
};

export const sendmail = async(req, res) => {
    try {
        const {name, email, contact, remark} = req.body;

        const transporter = nodemailer.createTransport({
            host: 'smtpout.secureserver.net',
            port: 465,
            secure: true,
            auth:{
                user: process.env.Gmail_ID,
                pass: process.env.Gmail_Password,
            },
        });

        const mailOptions = {
        from: process.env.Gmail_ID,
        to: "contact@typing.media",
        subject: "Hey Typing... you have a new Entry",
        text: `You have a new contact us entry:
        Name: ${name}
        Email: ${email}
        Contact: ${contact}
        Message: ${remark}`,
        };

        transporter.sendMail(mailOptions,(error, info) => {
            if (error) {
                console.error("Error sending email:",error);
                return res.status(500).json({ error: error.message || "Failed to send Email."});
            } else {
                console.log("Email Sent:", info.response);
                res.status(200).json({message: "Email sent successfully"});
            }
        })
    } catch (error) {
        res.status(500).json({ error: error.message || "Internal Server Error."});
    }
};