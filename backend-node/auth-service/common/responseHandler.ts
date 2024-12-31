import { Response } from "express";

export const sendSuccess = (res: Response, message: string, result: any = {}) => {
    res.status(200).json({
        success: true,
        data: {
            message,
            result
        },
        error:{}
    })
}

export const sendError = (res: Response, message: string, statusCode: number = 500, details: any= {}) => {
    res.status(statusCode).json({
        success: false,
        error: {
            message,
            details
        },
        data: {}
    })
}