import {StudentInterface} from '../../register-student/interfaces/student.interface';

export interface ChildFrequencyInterface {
  id?: number | string;
  register_student_id: number | string;
  entrance: string;
  exit?: string;
  meta?: ChildFrequencyMetaInterface;
  student?: Pick<StudentInterface, 'documents' | 'id' | 'meta' | 'name'>
  created_at?: string;
  updated_at?: string;
}

export interface ChildFrequencyMetaInterface {

}
