import { Response } from "express"

export const sendSuccess = (res: Response, status: number, message: string, result: any = {}) => {
    res.status(status).json({
        success: true,
        error: {},
        result: result,
        message: message
    })
}

export const sendError = (res: Response, status: number, message: string, details: any = {}) => {
    res.status(status).json({
        success: false,
        result: {},
        error: details,
        message: message
    })
}