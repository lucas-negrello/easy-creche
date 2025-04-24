export interface ChatInterface {
  id?: number;
  users: ChatUserInterface[];
  meta?: ChatMetaInterface;
  created_at?: string;
  updated_at?: string;
}

export interface ChatUserInterface {
  id: number;
  name: string;
  email: string;
}

export interface ChatMetaInterface {

}
