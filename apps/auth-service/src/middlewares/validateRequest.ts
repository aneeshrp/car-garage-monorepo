import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/responseHandler";

export const validateSignUp = (req: Request, res: Response, next: NextFunction ) => {
    const {name, email, password, role} = req.body;

    if( !name || !email || !password || !role ){
        return errorResponse(res, {message: "Missing required fields"}, 400);
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return errorResponse(res, "Invalid Email", 400);
    }    
    console.log(password.length);
    if( password.length < 8  || password.length > 30 ){
        return errorResponse(res, { message: "Password length is not accepted"}, 400)
    }
    next();
}