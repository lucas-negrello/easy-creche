export interface DocumentInterface {
  id?: number;
  name: string;
  file: File;
  register_student_id: number;
  created_at?: string;
  updated_at?: string;
}

export interface DocumentResponse {
  id?: number;
  name: string;
  register_student_id: number;
  original_name: string;
  file_path: string;
  mime_type: string;
  size: number;
  created_at?: string;
  updated_at?: string;
}
