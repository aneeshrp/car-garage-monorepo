import { Request, Response } from "express";
import {registerUserService} from "../services/authService";
import {successResponse, errorResponse} from "../utils/responseHandler";

export const registerUser = async(req: Request, res: Response) => {
    try {
        const result = await registerUserService(req.body);
        successResponse(res, result, 'User registered successfully');
    } catch ( err: any ){
        errorResponse(res, err, 400);
    }
}