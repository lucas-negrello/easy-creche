export interface ChatMessageInterface {
  id?: number;
  chat_id?: number;
  user_id?: number;
  message: string;
  meta?: ChatMessageMetaInterface;
  created_at?: string;
  updated_at?: string;
}

export interface ChatMessageMetaInterface {

}
