import {ResponsibleInterface} from '../../register-responsible/interfaces/responsible.interface';

export interface StudentInterface {
  id?: string | number;
  responsible_id?: number;
  name: string,
  birth_certificate: string,
  meta?: StudentMetaInterface,
  responsible?: Partial<ResponsibleInterface>
  created_at?: string,
  updated_at?: string
}

export interface StudentMetaInterface {
  blood_type?: string,
  age?: string,
  allergies?: string,
  gender?: string,
  medical_convenience?: string,
  url_documents?: Object[],
}
