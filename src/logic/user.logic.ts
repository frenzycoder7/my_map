import { IUser } from "@dataTypes";
import { getUserService, registerUserService, updateUserService } from "@services";
import { comparePassword, genOtp, generateToken, hashPassword, redisclient, sendMail, sendOtp } from "@utils";
import { Request, Response } from "express";

export const registerUserLogic = async (req: Request, res: Response) => {
    try {
        let body: IUser = req.body;
        body.password = await hashPassword(body.password)
        let mailOtp: number = genOtp();
        let smsOtp: number = genOtp();

        await sendOtp(body.number, smsOtp.toString());
        await sendMail({ to: [body.email], subject: 'OTP', text: mailOtp.toString() });

        await redisclient.set(body.email, mailOtp.toString());
        await redisclient.set(body.number, smsOtp.toString());

        res.status(200).json({
            message: 'Otp sent to your email and mobile number',
        });
    } catch (error) {
        res.status(500).json({
            message: 'User registration failed',
            error: error.message,
        });
    }
};

export const loginUserLogic = async (req: Request, res: Response) => {
    try {
        let { number, password } = req.body;
        let user: IUser | null = await getUserService({ $or: [{ number: number }, { email: number }] });
        if (!user) throw new Error('User not found with this number or email ' + number);
        let isMatch: boolean = await comparePassword(password, user.password);
        if (!isMatch) throw new Error('Password is incorrect');

        let token: string = await generateToken({ _id: user._id, email: user.email });
        user.token = token;
        await user.save();

        let data: any = user;
        delete data.password;

        res.status(200).json({
            message: 'User logged in successfully',
            token: token,
            data,
        });
    } catch (error) {
        res.status(500).json({
            message: 'User login failed',
            error: error.message,
        });
    }
}


export const validateTokenLogic = async (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Token is valid',
        user: req.user,
    });
}

export const logoutUserLogic = async (req: Request, res: Response) => {
    try {
        let user: IUser = req.user;
        user.token = null;
        let u: IUser | null = await updateUserService({ _id: user._id }, user);
        res.status(200).json({
            message: 'User logged out successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'User logout failed',
            error: error.message,
        });
    }
}