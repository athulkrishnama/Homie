export interface UserEntity {
    _id?: string,
    email: string,
    password: string,
    createdAt: Date,
    lastLogin: Date,
    isAdmin: boolean,
    fullname: string,
    phone: string,
    isBlocked: boolean,
    profileImage: string,
    hostStatus: 'disabled' | 'active' | 'blocked'
}