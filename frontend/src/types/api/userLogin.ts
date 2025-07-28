import type { UserEntity } from "../entities/userEntitiy";

export type userLoginDTO = Pick<UserEntity, 'email' | 'password'>