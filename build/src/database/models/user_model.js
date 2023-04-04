"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.userSchema = exports.userStructure = void 0;
const _dataTypes_1 = require("@dataTypes");
const _modelnames_1 = require("@modelnames");
const mongoose_1 = require("mongoose");
exports.userStructure = {
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    provider: {
        type: String,
        required: true,
        default: _dataTypes_1.PROVIDER_PENDING,
        enum: _dataTypes_1.PROVIDER_STATUS,
    },
    status: {
        type: String,
        required: true,
        default: _dataTypes_1.PENDING,
        enum: _dataTypes_1.U_AC_STATUS,
    },
    token: {
        type: String,
    }
};
exports.userSchema = new mongoose_1.Schema(exports.userStructure, {
    timestamps: true,
});
exports.UserModel = (0, mongoose_1.model)(_modelnames_1.UserModelName, exports.userSchema);
//# sourceMappingURL=user_model.js.map