import { ITokenBody } from "@dataTypes";
import { sign, verify } from "jsonwebtoken";

export const generateToken = async (payload: ITokenBody): Promise<string> => {
    let s: string = process.env.KEY || 'Hello World';
    return sign(payload, s, { expiresIn: '30d' });
}
export const verifyToken = async (token: string): Promise<ITokenBody> => {
    let s: string = process.env.KEY || 'Hello World';
    return verify(token, s) as ITokenBody;
}