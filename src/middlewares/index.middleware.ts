import { ITokenBody, IUser } from "@dataTypes";
import { UserModel } from "@models";
import { verifyToken } from "@utils";
import { NextFunction, Request, Response } from "express";

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.headers.authorization;
        if (!token) throw Error('Token not found');
        let payLoad: ITokenBody = await verifyToken(token);
        let query: any = {
            _id: payLoad._id,
            email: payLoad.email,
            token: token,
        }
        let user: IUser | any = await UserModel.findOne(query);
        if (user === null) throw Error('User not found or token expired');
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const checkRequiredBody = (keys: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            let body = req.body;
            for (let key of keys) {
                if (!body[key]) throw Error(`${key} is required`);
            }
            next();
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }
}

export const checkRequiredHeaders = (keys: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            let headers = req.headers;
            for (let key of keys) {
                if (!headers[key]) throw Error(`${key} is required`);
            }
            next();
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }
}

export const checkrequiredQuery = (keys: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            let query = req.query;
            for (let key of keys) {
                if (!query[key]) throw Error(`${key} is required`);
            }
            next();
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }
}