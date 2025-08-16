export interface Habit {
  id: string;
  title: string;
  description: string;
  streak: number;
  frequency: string;
  last_completed: Date;
}
