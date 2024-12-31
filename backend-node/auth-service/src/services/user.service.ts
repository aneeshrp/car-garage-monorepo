import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

export const createUser = async (data:any) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = new User({...data, password: hashedPassword});
    return user.save();
}

export const authenticateUser = async( data:any) => {
    const user = await User.findOne({email: data.email});
    console.log(user);
    if( !user) throw new Error('Invalid Credentials');

    const isPassword = await bcrypt.compare(data.password, user.password);

    if( !isPassword) throw new Error('Invalid Credentials');

    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET!, {expiresIn: '1h'});

    return token;
}