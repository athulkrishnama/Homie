import type { UserEntity } from "@/types/entities/userEntitiy"

export type userSignupDTO = Pick<UserEntity, 'fullname' | 'password' | 'email'>;