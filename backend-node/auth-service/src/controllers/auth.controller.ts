import { Request, Response, RequestHandler } from "express";
import {createUser, authenticateUser } from '../services/user.service';
import { sendSuccess, sendError } from "../../common/responseHandler";


export const register = async ( req: Request, res: Response): Promise<void> => {
    try {
        const user = await createUser(req.body);
        sendSuccess(res, 'User successfull registered', {user});
    } catch(error:any) {
        sendError(res, 'Failed to register', 500, error )
    }
}

export const login = async ( req: Request, res: Response): Promise<void> => {
    try {
        const token = await authenticateUser(req.body);
        sendSuccess(res, 'User successfully Logged in', {token});

    } catch(error:any) {
        sendError(res, 'Invalid Credentials', 401, error )
    }
}