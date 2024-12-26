import User from "../models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { errorResponse } from "../utils/responseHandler";
errorResponse

interface RegisterUserParams {
    name: string;
    email: string;
    password: string;
    role: string;
}

export const registerUserService = async({
    name, email, password, role,
}: RegisterUserParams) => {

    //Check if user already exists
    const existingUser = await User.findOne({email});

    if( existingUser ) throw new Error ('Email already exists');

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({name, email, password: hashedPassword, role});

    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET || '', {expiresIn: '1d'});

    return {token};
};