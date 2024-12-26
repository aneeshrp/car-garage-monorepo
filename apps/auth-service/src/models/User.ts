import exp from "constants";
import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document {
    name: string, 
    email: string,
    password: string,
    role: 'SuperAdmin' | 'BranchAdmin', 'Technician',
    createdAt: Date
}

const UserSchema: Schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['SuperAdmin', 'BranchAdmin', 'Technician'], required: true},
    createdAt: {type: Date, default: Date.now}
});

export default mongoose.model<IUser>('User', UserSchema);