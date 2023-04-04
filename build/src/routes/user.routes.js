"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_routes = void 0;
const _logic_1 = require("@logic");
const _middlewares_1 = require("@middlewares");
const _models_1 = require("@models");
const express_1 = require("express");
exports.user_routes = (0, express_1.Router)();
exports.user_routes.post('/register', (0, _middlewares_1.checkRequiredBody)((0, _middlewares_1.filterRequiredKeys)(_models_1.userStructure)), _logic_1.registerUserLogic);
exports.user_routes.post('/login', (0, _middlewares_1.checkRequiredBody)(['number', 'password']), _logic_1.loginUserLogic);
exports.user_routes.get('/validate-token', (0, _middlewares_1.checkRequiredHeaders)(['authorization']), (0, _middlewares_1.isAuthenticated)(false), _logic_1.validateTokenLogic);
//# sourceMappingURL=user.routes.js.map