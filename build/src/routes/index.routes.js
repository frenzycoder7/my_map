"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_routes = void 0;
const _middlewares_1 = require("@middlewares");
const _services_1 = require("@services");
const express_1 = require("express");
exports.user_routes = (0, express_1.Router)();
exports.user_routes.post('/register', (0, _middlewares_1.checkRequiredBody)(['name', 'email', 'password']), _services_1.createUser);
exports.user_routes.post('/login', _services_1.loginUser);
exports.user_routes.get('/me', (0, _middlewares_1.checkRequiredHeaders)(['authorization']), _middlewares_1.isAuth, _services_1.validateUser);
exports.user_routes.post('/location', (0, _middlewares_1.checkRequiredHeaders)(['authorization']), (0, _middlewares_1.checkRequiredBody)(['lat', 'lng']), _middlewares_1.isAuth, _services_1.createLocationData);
exports.user_routes.get('/location', (0, _middlewares_1.checkRequiredHeaders)(['authorization']), (0, _middlewares_1.checkrequiredQuery)(['date']), _middlewares_1.isAuth, _services_1.getLocationData);
exports.user_routes.get('/history', (0, _middlewares_1.checkRequiredHeaders)(['authorization']), _middlewares_1.isAuth, _services_1.getHistory);
//# sourceMappingURL=index.routes.js.map