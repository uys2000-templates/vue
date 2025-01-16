export interface UAgenda {
  timestamp: number;
  color: string;
  title: string;
  content: string;
  note: string;
  allDay: boolean;
  start: Date;
  end: Date;
  repeat: boolean;
  repeatCount: number;
  repeatType: string;
  repeatWeeklyDays: number[];
}
