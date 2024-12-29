export interface UAgenda {
  timestamp: number;
  color: string;
  title: string;
  note: string;
  allDay: boolean;
  start: Date;
  end: Date;
  repeat: false;
  repeatType: string;
  repeatWeeklyDays: number[];
}
