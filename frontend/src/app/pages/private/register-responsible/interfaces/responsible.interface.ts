export interface ResponsibleInterface {
  id?: string | number;
  name: string,
  email: string,
  password: string,
  password_confirmation: string,
  meta?: ResponsibleMetaInterface,
  created_at?: string,
  updated_at?: string
}

export interface ResponsibleMetaInterface {
  cpf?: string,
  address?: string,
  phone?: string,
}
