import { StreaksCard } from "@/components/streak-card";
import { useStreakCalculator } from "@/hooks/common/useStreakCalculator";
import { useHabits, useHabitsCompleted } from "@/hooks/services";
import { streakStyles } from "@/styles/streak-style";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";

export default function StreaksScreen() {
  const { data: habits, isPending } = useHabits();
  const { data: completedHabits } = useHabitsCompleted();

  const { rankedHabits } = useStreakCalculator(habits, completedHabits);

  console.log(rankedHabits);

  return (
    <View style={streakStyles.container}>
      <Text variant="headlineSmall" style={streakStyles.title}>
        Habit Streaks
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <StreaksCard data={rankedHabits} isLoading={isPending} />
      </ScrollView>
    </View>
  );
}
