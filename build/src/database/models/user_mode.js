"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.userSchema = void 0;
const _modelnames_1 = require("@modelnames");
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        index: true,
    }
}, {
    timestamps: true,
});
exports.UserModel = (0, mongoose_1.model)(_modelnames_1.UserModelName, exports.userSchema);
//# sourceMappingURL=user_mode.js.map