"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = exports.filterRequiredKeys = exports.checkrequiredQuery = exports.checkRequiredHeaders = exports.checkRequiredBody = void 0;
const _services_1 = require("@services");
const _utils_1 = require("@utils");
const checkRequiredBody = (keys) => {
    return (req, res, next) => {
        try {
            let body = req.body;
            for (let key of keys) {
                if (!body[key])
                    throw Error(`${key} is required`);
            }
            next();
        }
        catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    };
};
exports.checkRequiredBody = checkRequiredBody;
const checkRequiredHeaders = (keys) => {
    return (req, res, next) => {
        try {
            let headers = req.headers;
            for (let key of keys) {
                if (!headers[key])
                    throw Error(`${key} is required`);
            }
            next();
        }
        catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    };
};
exports.checkRequiredHeaders = checkRequiredHeaders;
const checkrequiredQuery = (keys) => {
    return (req, res, next) => {
        try {
            let query = req.query;
            for (let key of keys) {
                if (!query[key])
                    throw Error(`${key} is required`);
            }
            next();
        }
        catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    };
};
exports.checkrequiredQuery = checkrequiredQuery;
const filterRequiredKeys = (schema) => {
    let keys = schema;
    let requred = [];
    for (let key in keys) {
        if (keys[key].required && keys[key].ref == undefined) {
            requred.push(key);
        }
    }
    return requred;
};
exports.filterRequiredKeys = filterRequiredKeys;
const isAuthenticated = (isRemove) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let token = req.headers.authorization;
            if (!token)
                throw new Error('Token is required');
            let tokenBody = yield (0, _utils_1.verifyToken)(token);
            if (!tokenBody)
                throw new Error('TOKEN_EXPIRED');
            tokenBody.token = token;
            let user = yield _utils_1.redisclient.get(JSON.stringify(tokenBody));
            if (!user) {
                user = yield (0, _services_1.getUserService)(tokenBody);
                if (!user)
                    throw new Error('TOKEN_EXPIRED');
                yield _utils_1.redisclient.set(JSON.stringify(tokenBody), JSON.stringify(user));
            }
            else {
                console.log('user from redis with key: ', JSON.stringify(tokenBody));
                user = JSON.parse(user);
            }
            if (isRemove) {
                yield _utils_1.redisclient.del(JSON.stringify(tokenBody));
            }
            req.user = user;
            next();
        }
        catch (error) {
            if (error.message == 'TOKEN_EXPIRED') {
                res.status(401).json({
                    message: error.message,
                });
            }
            else {
                res.status(500).json({
                    message: error.message,
                });
            }
        }
    });
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=index.middleware.js.map