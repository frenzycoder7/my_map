import { ITokenBody } from "@dataTypes";
import { LocationModel, UserModel } from "@models";
import { generateToken } from "@utils";
import { Request, Response } from "express";
import moment from "moment";

export const createUser = async (req: Request, res: Response) => {
    try {
        let user = await UserModel.create(req.body);
        res.status(200).json({
            message: 'User created successfully',
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        let { email, password } = req.body;
        let user = await UserModel.findOne({ email, password });

        if (!user) throw Error('Email or password incorrect');
        let token = await generateToken({ _id: user._id, email: user.email });
        await UserModel.findOneAndUpdate({
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
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const validateUser = async (req: Request, res: Response) => {
    res.status(200).json({
        user: req.user,
    });
}

export const createLocationData = async (req: Request, res: Response) => {
    try {
        let { lat, lng } = req.body;
        let location = await LocationModel.create({
            user: req.user._id,
            latitude: lat,
            longitude: lng,
        });
        res.status(200).json({
            message: 'Location created successfully',
            location,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const getLocationData = async (req: Request, res: Response) => {
    try {
        let { date } = req.query;
        let startDate = moment(date as string).startOf('day').toDate();
        let endDate = moment(date as string).endOf('day').toDate();
        let locations = await LocationModel.aggregate([
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
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const getHistory = async (req: Request, res: Response) => {
    try {
        let locations = await LocationModel.aggregate([
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
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}