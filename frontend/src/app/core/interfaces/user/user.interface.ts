export interface UserInterface {
  id?: number;
  name: string;
  email: string;
  email_verified_at?: string;
  meta?: any;
  created_at?: string;
  updated_at?: string;
  roles?: RolesInterface[];
}

export interface RolesInterface {
  id?: number;
  name: 'admin' | 'user' | 'super_admin';
  created_at?: string;
  updated_at?: string;
}
