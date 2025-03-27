import {AvailableRoles} from '../commons/roles/roles.interface';


export type SidebarMenuRoles = keyof typeof SidebarMenuRoles;

export interface SidebarMenu {
  label: string;
  icon: string;
  route: string;
  isActive: boolean;
  isHome: boolean;
  roles: SidebarMenuRoles[];
}

export const SidebarMenuRoles = AvailableRoles;
