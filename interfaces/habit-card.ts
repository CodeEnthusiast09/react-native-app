import { Habit, HabitWithStreak } from "./habit";

export interface HabitCard {
  data: Habit[];
  isLoading?: boolean;
}

export interface StreakCard {
  data: HabitWithStreak[];
  isLoading?: boolean;
}
