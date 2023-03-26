import { checkRequiredBody, checkRequiredHeaders, checkrequiredQuery, isAuth } from "@middlewares";
import { createLocationData, createUser, getHistory, getLocationData, loginUser, validateUser } from "@services";
import { IRouter, Router } from "express";

export const user_routes: IRouter = Router();

user_routes.post('/register', checkRequiredBody(['name', 'email', 'password']), createUser);
user_routes.post('/login', loginUser);

user_routes.get('/me', checkRequiredHeaders(['authorization']), isAuth, validateUser);

user_routes.post('/location', checkRequiredHeaders(['authorization']), checkRequiredBody(['lat', 'lng']), isAuth, createLocationData);

user_routes.get('/location', checkRequiredHeaders(['authorization']), checkrequiredQuery(['date']), isAuth, getLocationData);
user_routes.get('/history', checkRequiredHeaders(['authorization']), isAuth, getHistory);