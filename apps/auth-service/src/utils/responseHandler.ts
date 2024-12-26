import { Response } from "express";

export const successResponse = (res: Response, data: any, message: string = 'Success') => {
    res.status(200).json({success: true, message, data})
};

export const errorResponse = (res: Response, error: any, statusCode: number = 500) => {
    res.status(statusCode).json({
        success: false,
        message: error.message || 'Internal Server Error'
    })
};