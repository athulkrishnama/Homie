import type { UserEntity } from "@/types/entities/userEntitiy";

export type userForgetPasswordSendOtpType = Pick<UserEntity, 'email'>;