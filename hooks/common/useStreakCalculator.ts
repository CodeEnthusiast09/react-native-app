import {
  Habit,
  HabitCompletions,
  HabitWithStreak,
  StreakData,
} from "@/interfaces";
import { useMemo } from "react";

export const useStreakCalculator = (
  habits: Habit[] | undefined,
  completedHabits: HabitCompletions[] | undefined
) => {
  const habitStreaks = useMemo(() => {
    if (!habits) return [];
    const getStreaks = (habitId: string): StreakData => {
      const habitsCompletion = completedHabits
        ?.filter((h) => habitId === h.habitId)
        .sort(
          (a, b) =>
            new Date(a.completedAt).getTime() -
            new Date(b.completedAt).getTime()
        );

      if (!habitsCompletion || habitsCompletion.length === 0) {
        return {
          streak: 0,
          bestStreak: 0,
          total: 0,
        };
      }

      let streak = 0;
      let bestStreak = 0;
      const total = habitsCompletion.length;
      let lastDate: Date | null = null;
      let currentStreak = 0;

      habitsCompletion.forEach((completion) => {
        const completedAt = new Date(completion.completedAt);

        if (lastDate) {
          const diffDays = Math.ceil(
            (completedAt.getTime() - lastDate.getTime()) / (1000 * 3600 * 24)
          );

          if (diffDays <= 1.5) {
            currentStreak += 1;
          } else {
            currentStreak = 1;
          }
        } else {
          currentStreak = 1; 
        }
        if (currentStreak > bestStreak) {
          bestStreak = currentStreak;
        }
        streak = currentStreak;

        lastDate = completedAt;
      });

      return { streak, bestStreak, total };
    };

    return habits.map((habit): HabitWithStreak => {
      const { streak, bestStreak, total } = getStreaks(habit.id);
      return { habit, streak, bestStreak, total };
    });
  }, [habits, completedHabits]);

  const rankedHabits = useMemo(() => {
    return habitStreaks.sort((a, b) => b.bestStreak - a.bestStreak);
  }, [habitStreaks]);

  return { habitStreaks, rankedHabits };
};
