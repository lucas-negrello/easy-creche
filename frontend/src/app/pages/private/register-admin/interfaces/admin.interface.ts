export interface AdminInterface {
  id?: string | number;
  name: string,
  email: string,
  password: string,
  password_confirmation: string,
  meta: AdminMetaInterface,
  created_at: string,
  updated_at: string
}

export interface AdminMetaInterface {
  cpf: string,
  address: string,
  function: string,
  workspace: string,
  phone: string,
}
