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
exports.checkrequiredQuery = exports.checkRequiredHeaders = exports.checkRequiredBody = exports.isAuth = void 0;
const _models_1 = require("@models");
const _utils_1 = require("@utils");
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = req.headers.authorization;
        if (!token)
            throw Error('Token not found');
        let payLoad = yield (0, _utils_1.verifyToken)(token);
        let query = {
            _id: payLoad._id,
            email: payLoad.email,
            token: token,
        };
        let user = yield _models_1.UserModel.findOne(query);
        if (user === null)
            throw Error('User not found or token expired');
        req.user = user;
        next();
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});
exports.isAuth = isAuth;
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
//# sourceMappingURL=index.middleware.js.map