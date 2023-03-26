"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationModel = exports.locationSchema = void 0;
const _modelnames_1 = require("@modelnames");
const mongoose_1 = require("mongoose");
exports.locationSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: _modelnames_1.UserModelName,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
});
exports.LocationModel = (0, mongoose_1.model)(_modelnames_1.LocationModelName, exports.locationSchema);
//# sourceMappingURL=location_model.js.map