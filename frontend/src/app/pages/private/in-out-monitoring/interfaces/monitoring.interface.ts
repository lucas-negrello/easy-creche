import {StudentInterface} from '../../register-student/interfaces/student.interface';

export interface MonitoringInterface {
  id?: number | string;
  register_student_id: number | string;
  entrance: string;
  exit?: string;
  meta: MonitoringMetaInterface;
  student?: Pick<StudentInterface, 'documents' | 'id' | 'meta' | 'name'>
  created_at?: string;
  updated_at?: string;
}

export interface MonitoringMetaInterface {
  entrance?: MonitoringTypesInterface;
  exit?: MonitoringTypesInterface;
}

export interface MonitoringTypesInterface {
  responsible_id?: number | string;
  responsible?: string;
  responsible_cpf?: string;
}

export type MonitoringDialogDataType = {
  studentId: number | string;
  monitoring?: MonitoringInterface;
} | null;
