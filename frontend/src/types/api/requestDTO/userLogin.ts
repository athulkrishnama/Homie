import type { UserEntity } from "@/types/entities/userEntitiy" 

export type userLoginDTO = Pick<UserEntity, 'email' | 'password'>