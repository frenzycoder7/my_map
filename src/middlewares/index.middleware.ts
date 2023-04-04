import { ITokenBody, IUser } from "@dataTypes";
import { getUserService } from "@services";
import { redisclient, verifyToken } from "@utils";
import { NextFunction, Request, Response } from "express";


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
export const filterRequiredKeys = (schema: any) => {
    let keys = schema;
    let requred: string[] = [];
    for (let key in keys) {
        if (keys[key].required && keys[key].ref == undefined && keys[key].enum == undefined) {
            requred.push(key);
        }
    }
    return requred;
}

export const isAuthenticated = (isRemove: Boolean) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            let token: string | undefined = req.headers.authorization;

            if (!token) throw new Error('Token is required');
            let tokenBody: any = await verifyToken(token);

            if (!tokenBody) throw new Error('TOKEN_EXPIRED');
            tokenBody.token = token;

            let user: any = await redisclient.get(JSON.stringify(tokenBody));

            if (!user) {
                user = await getUserService(tokenBody);
                if (!user) throw new Error('TOKEN_EXPIRED');
                await redisclient.set(JSON.stringify(tokenBody), JSON.stringify(user), 'EX', 60 * 2);
            } else {
                console.log('user from redis with key: ', JSON.stringify(tokenBody));
                user = JSON.parse(user);
            }

            if (isRemove) {
                await redisclient.del(JSON.stringify(tokenBody));
            }
            req.user = user;
            next();
        } catch (error) {
            if (error.message == 'TOKEN_EXPIRED') {
                res.status(401).json({
                    message: error.message,
                });
            } else {
                res.status(500).json({
                    message: error.message,
                });
            }
        }
    }
} 