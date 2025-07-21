import { Schema } from "mongoose";
import { userEntity } from "../../../../domain/entities/user/userEntity";

export const userSchema = new Schema<userEntity>({
    email: {
        type: String,
        required: [true, "Email address is required for user registration"],
        unique: [true, "document with same email exists"]
    },
    fullname: {
        type: String,
        required: function () {
            return !this.isAdmin
        }
    },
    password: {
        type: String,
        required: [true, "Password is required for user registration"]
    },
    phone: {
        type: String,
    },
    profileImage: {
        type: String
    },
    isBlocked: {
        type: Boolean,
        required: true,
        default: false
    },
    hostStatus: {
        type: String,
        required: true,
        enum: ['disabled', 'active', 'blocked'],
        default: 'disabled'
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
    }
})