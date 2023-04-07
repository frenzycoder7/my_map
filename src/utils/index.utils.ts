
import { compare, genSalt, hash } from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken';
import redis from 'ioredis'
import axios from 'axios';
import { ITokenBody } from '@dataTypes';
import { createTransport, SendMailOptions } from 'nodemailer'
import { config } from 'dotenv';
config({ path: './.env' });
export const transporterOptions = createTransport({
    host: 'smtp.booringcodes.in',
    port: 25,
    secure: true,
    auth: {
        user: process.env.NEW_MAIL,
        pass: process.env.NEW_PASSWORD
    }
});


export const redisclient = new redis()

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await genSalt(10);
    return await hash(password, salt);
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return await compare(password, hash);
}

export const generateToken = async (payload: ITokenBody): Promise<string> => {
    let s: string = process.env.KEY || 'Hello World';
    return sign(payload, s, { expiresIn: '30d' });
}
export const verifyToken = async (token: string): Promise<ITokenBody> => {
    let s: string = process.env.KEY || 'Hello World';
    return verify(token, s) as ITokenBody;
}

export const getMessageBody = (message: string) => {
    return `Dear User,\n\nOTP to log in is ${message}, Or use this link to log into app 
https://tx.gl/r/42r0r\nThank You for using online services.\n\nMagadh Industries `;
}



export const sendOtp = async (number: string, otp: string) => {

    try {
        let message: string = getMessageBody(otp);
        if (!process.env.SMS_API || !process.env.SMS_SENDER) {
            console.log('SMS API or SMS SENDER not found');
            throw new Error('SMS API or SMS SENDER not found');
        } else {
            const url = 'https://api.textlocal.in/send/';
            let res = await axios.post(url, {}, {
                params: {
                    apiKey: process.env.SMS_API,
                    sender: process.env.SMS_SENDER,
                    numbers: number,
                    message: message
                }
            });
            console.log(res.data);
            if (res.status === 200) {
                console.log('OTP sent successfully');
            } else {
                console.log('OTP not sent');
            }
        }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const sendMail = async (data: SendMailOptions) => {
    try {
        let res = await transporterOptions.sendMail(data);
        console.log(res);
        if (res.accepted.length > 0) {
            console.log('Mail sent successfully');
        } else {
            console.log('Mail not sent');
        }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const genOtp = () => {
    return Math.floor(100000 + Math.random() * 900000);
}