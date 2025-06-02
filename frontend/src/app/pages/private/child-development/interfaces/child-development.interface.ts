import {StudentInterface} from '../../register-student/interfaces/student.interface';
import {AdminInterface} from '../../register-admin/interfaces/admin.interface';

export interface ChildDevelopmentInterface {
  id?: number;
  student_id: number;
  created_by?: number;
  description: string;
  student: Pick<StudentInterface, 'id' | 'name'>;
  register_admin: Pick<AdminInterface, 'id' | 'name'>;
  meta?: ChildDevelopmentMetaInterface;
  created_at?: string;
  updated_at?: string;
}

export interface ChildDevelopmentMetaInterface {

}
