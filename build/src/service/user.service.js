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
exports.updateUserService = exports.getUserService = exports.registerUserService = void 0;
const _models_1 = require("@models");
const registerUserService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield _models_1.UserModel.create(data);
    return user;
});
exports.registerUserService = registerUserService;
const getUserService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield _models_1.UserModel.findOne(query);
    return user;
});
exports.getUserService = getUserService;
const updateUserService = (query, data) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield _models_1.UserModel.findOneAndUpdate(query, data);
    return user;
});
exports.updateUserService = updateUserService;
//# sourceMappingURL=user.service.js.map