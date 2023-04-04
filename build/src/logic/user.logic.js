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
exports.validateTokenLogic = exports.loginUserLogic = exports.registerUserLogic = void 0;
const _services_1 = require("@services");
const _utils_1 = require("@utils");
const registerUserLogic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let body = req.body;
        let user = yield (0, _services_1.registerUserService)(body);
        res.status(200).json({
            message: 'User registered successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'User registration failed',
            error: error.message,
        });
    }
});
exports.registerUserLogic = registerUserLogic;
const loginUserLogic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { number, password } = req.body;
        let user = yield (0, _services_1.getUserService)({ $or: [{ number: number }, { email: number }] });
        if (!user)
            throw new Error('User not found with this number or email ' + number);
        let isMatch = yield (0, _utils_1.comparePassword)(password, user.password);
        if (!isMatch)
            throw new Error('Password is incorrect');
        let token = yield (0, _utils_1.generateToken)({ _id: user._id, email: user.email });
        user.token = token;
        yield user.save();
        let data = user;
        delete data.password;
        res.status(200).json({
            message: 'User logged in successfully',
            token: token,
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'User login failed',
            error: error.message,
        });
    }
});
exports.loginUserLogic = loginUserLogic;
const validateTokenLogic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        message: 'Token is valid',
        user: req.user,
    });
});
exports.validateTokenLogic = validateTokenLogic;
//# sourceMappingURL=user.logic.js.map