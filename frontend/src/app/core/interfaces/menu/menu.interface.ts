export type SidebarMenuRoles = keyof typeof SidebarMenuRoles;

export interface SidebarMenu {
  label: string;
  icon: string;
  route: string;
  isActive: boolean;
  isHome: boolean;
  role: SidebarMenuRoles[];
}

export const SidebarMenuRoles = {
  admin: 'admin',
  user: 'user',
} as const;
