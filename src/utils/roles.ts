import { SetMetadata } from '@nestjs/common';

export enum Role {
  Admin = 'Admin',
  customer = 'customer',
}
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
