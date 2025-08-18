import { Habit } from "./habit";

export interface HabitCard {
  data: Habit[];
  isLoading?: boolean;
}
