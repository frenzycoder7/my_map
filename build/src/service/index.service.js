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
exports.getHistory = exports.getLocationData = exports.createLocationData = exports.validateUser = exports.loginUser = exports.createUser = void 0;
const _models_1 = require("@models");
const _utils_1 = require("@utils");
const moment_1 = __importDefault(require("moment"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield _models_1.UserModel.create(req.body);
        res.status(200).json({
            message: 'User created successfully',
            user,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email, password } = req.body;
        let user = yield _models_1.UserModel.findOne({ email, password });
        if (!user)
            throw Error('Email or password incorrect');
        let token = yield (0, _utils_1.generateToken)({ _id: user._id, email: user.email });
        yield _models_1.UserModel.findOneAndUpdate({
            _id: user._id,
        }, {
            $set: {
                token,
            }
        });
        res.status(200).send({
            message: 'User logged in successfully',
            token,
            user,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});
exports.loginUser = loginUser;
const validateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        user: req.user,
    });
});
exports.validateUser = validateUser;
const createLocationData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { lat, lng } = req.body;
        let location = yield _models_1.LocationModel.create({
            user: req.user._id,
            latitude: lat,
            longitude: lng,
        });
        res.status(200).json({
            message: 'Location created successfully',
            location,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});
exports.createLocationData = createLocationData;
const getLocationData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { date } = req.query;
        let startDate = (0, moment_1.default)(date).startOf('day').toDate();
        let endDate = (0, moment_1.default)(date).endOf('day').toDate();
        let locations = yield _models_1.LocationModel.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate,
                    }
                }
            },
            {
                $sort: {
                    createdAt: -1,
                }
            },
            {
                $project: {
                    _id: 0,
                    latitude: 1,
                    longitude: 1,
                    createdAt: 1,
                }
            }
        ]);
        res.status(200).json({
            message: 'Locations fetched successfully',
            locations,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});
exports.getLocationData = getLocationData;
const getHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let locations = yield _models_1.LocationModel.aggregate([
            {
                $sort: {
                    createdAt: -1,
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 },
                }
            },
            {
                $project: {
                    _id: 0,
                    date: "$_id",
                    location: "$count",
                }
            }
        ]);
        res.status(200).json({
            message: 'Locations fetched successfully',
            locations,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});
exports.getHistory = getHistory;
//# sourceMappingURL=index.service.js.map