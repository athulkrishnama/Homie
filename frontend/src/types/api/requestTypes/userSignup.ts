import type { UserEntity } from "@/types/entities/userEntitiy"

export interface userSignup {
    userData: Pick<UserEntity, 'fullname' | 'password' | 'email'>
    otp: string
}  