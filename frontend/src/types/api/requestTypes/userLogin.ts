import type { UserEntity } from "@/types/entities/userEntitiy"

export type userLoginRequestType = Pick<UserEntity, 'email' | 'password'>