import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class Notification {
  id: string;
  message: string;
  severity: string;
  uid: string;
  seen: boolean;
  }
