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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtp = exports.getMessageBody = exports.verifyToken = exports.generateToken = exports.comparePassword = exports.hashPassword = exports.redisclient = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const ioredis_1 = __importDefault(require("ioredis"));
const axios_1 = __importDefault(require("axios"));
exports.redisclient = new ioredis_1.default();
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield (0, bcryptjs_1.genSalt)(10);
    return yield (0, bcryptjs_1.hash)(password, salt);
});
exports.hashPassword = hashPassword;
const comparePassword = (password, hash) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, bcryptjs_1.compare)(password, hash);
});
exports.comparePassword = comparePassword;
const generateToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let s = process.env.KEY || 'Hello World';
    return (0, jsonwebtoken_1.sign)(payload, s, { expiresIn: '30d' });
});
exports.generateToken = generateToken;
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let s = process.env.KEY || 'Hello World';
    return (0, jsonwebtoken_1.verify)(token, s);
});
exports.verifyToken = verifyToken;
const getMessageBody = (message) => {
    return `Dear User,\n\nOTP to log in is ${message}, Or use this link to log into app 
https://tx.gl/r/42r0r\nThank You for using online services.\n\nMagadh Industries `;
};
exports.getMessageBody = getMessageBody;
const sendOtp = (number, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let message = (0, exports.getMessageBody)(otp);
        if (!process.env.SMS_API || !process.env.SMS_SENDER) {
            console.log('SMS API or SMS SENDER not found');
            throw new Error('SMS API or SMS SENDER not found');
        }
        else {
            const url = 'https://api.textlocal.in/send/';
            let res = yield axios_1.default.post(url, {}, {
                params: {
                    apiKey: process.env.SMS_API,
                    sender: process.env.SMS_SENDER,
                    numbers: number,
                    message: message
                }
            });
            console.log(res.data);
            if (res.status === 200) {
                console.log('OTP sent successfully');
            }
            else {
                console.log('OTP not sent');
            }
        }
    }
    catch (error) {
        console.log(error);
        throw new Error(error);
    }
});
exports.sendOtp = sendOtp;
//# sourceMappingURL=index.utils.js.map