export interface Habit {
  id: string;
  title: string;
  description: string;
  streak: number;
  frequency: string;
  last_completed: string;
}

export interface HabitCompletions {
  habitId: string;
  completedAt: string;
}

export interface StreakData {
  streak: number;
  bestStreak: number;
  total: number;
}

export interface HabitWithStreak {
  habit: {
    id: string;
    title: string;
    description: string;
  };
  streak: number;
  bestStreak: number;
  total: number;
}
