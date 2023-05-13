import { BaseUserDto } from './base-user.dto';

export class UpdateUserDto extends BaseUserDto {
  password: string;
  name: string;
  dob?: Date;
  gender?: Date;
  phone?: string;
}