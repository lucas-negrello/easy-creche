import {AvailableRoles} from '../commons/roles/roles.interface';
import {StudentInterface} from '../../../pages/private/register-student/interfaces/student.interface';

export type UserRoleNames = keyof typeof UserRoleNames;

export interface UserInterface {
  id?: number;
  name: string;
  email: string;
  email_verified_at?: string;
  meta?: any;
  created_at?: string;
  updated_at?: string;
  roles: RolesInterface[];
  students?: StudentInterface[];
}

export interface RolesInterface {
  id?: number;
  name: UserRoleNames;
  created_at?: string;
  updated_at?: string;
}

export const UserRoleNames = AvailableRoles;
