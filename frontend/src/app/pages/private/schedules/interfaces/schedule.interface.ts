import {UserInterface} from '../../../../core/interfaces/user/user.interface';

export interface ScheduleInterface {
  id?: string | number;
  created_by?: string | number;
  event_name: string;
  event_date: string;
  meta?: ScheduleMetaInterface;
  user?: Pick<UserInterface, 'id' | 'name' | 'meta'>;
}

export interface ScheduleMetaInterface {
  event_description?: string;
  event_type?: string;
  event_location?: string;
  event_duration?: string;
  event_urgency?: string;
  event_user_ids?: number[];
}
