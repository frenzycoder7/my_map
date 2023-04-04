import { loginUserLogic, logoutUserLogic, registerUserLogic, validateTokenLogic } from "@logic";
import { checkRequiredBody, checkRequiredHeaders, filterRequiredKeys, isAuthenticated } from "@middlewares";
import { userStructure } from "@models";
import { IRouter, Router } from "express";

export const user_routes: IRouter = Router();

user_routes.post(
    '/register',
    checkRequiredBody(filterRequiredKeys(userStructure)),
    registerUserLogic,
);

user_routes.post(
    '/login',
    checkRequiredBody(['number', 'password']),
    loginUserLogic,
);

user_routes.get(
    '/validate-token',
    checkRequiredHeaders(['authorization']),
    isAuthenticated(false),
    validateTokenLogic,
);

user_routes.delete(
    '/logout',
    checkRequiredHeaders(['authorization']),
    isAuthenticated(true),
    logoutUserLogic,
);