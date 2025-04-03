import {ResponsibleInterface} from '../../register-responsible/interfaces/responsible.interface';
import {DocumentResponse} from '../../docs/interfaces/docs.interface';

export interface StudentInterface {
  id?: string | number;
  responsible_id?: number;
  name: string;
  birth_certificate: string;
  meta?: StudentMetaInterface;
  responsible?: Partial<ResponsibleInterface>;
  documents: DocumentResponse[];
  created_at?: string,
  updated_at?: string
}

export interface StudentMetaInterface {
  blood_type?: string,
  age?: string,
  allergies?: string,
  gender?: string,
  medical_convenience?: string,
}
