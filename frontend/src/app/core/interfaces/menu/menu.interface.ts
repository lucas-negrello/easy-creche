export type SidebarMenuRoles = keyof typeof SidebarMenuRoles;

export interface SidebarMenu {
  label: string;
  icon: string;
  route: string;
  isActive: boolean;
  isHome: boolean;
  roles: SidebarMenuRoles[];
}

export const SidebarMenuRoles = {
  admin: 'admin',
  user: 'user',
  super_admin: 'super_admin',
} as const;
