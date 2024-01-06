import { IUser } from "src/types"

export interface UserResponse {
    token: string,
    user:IUser
}

export interface EmailVerificationResponse {
    message: string
}