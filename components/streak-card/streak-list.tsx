import { HabitWithStreak } from "@/interfaces";
import { streakStyles } from "@/styles/streak-style";
import { ScrollView, View } from "react-native";
import { Card, Text } from "react-native-paper";

interface StreakListProps {
  rankedHabits: HabitWithStreak[];
}

export const StreakList = ({ rankedHabits }: StreakListProps) => {
  if (!rankedHabits || rankedHabits.length === 0) {
    return (
      <View>
        <Text>No Habits yet. Add your first Habit!</Text>
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={streakStyles.container}
    >
      {rankedHabits.map(({ habit, streak, bestStreak, total }, key) => (
        <Card
          key={habit.id}
          style={[streakStyles.card, key === 0 && streakStyles.firstCard]}
        >
          <Card.Content>
            <Text variant="titleMedium" style={streakStyles.habitTitle}>
              {habit.title}
            </Text>
            <Text style={streakStyles.habitDescription}>
              {habit.description}
            </Text>
            <View style={streakStyles.statsRow}>
              <View style={streakStyles.statBadge}>
                <Text style={streakStyles.statBadgeText}>🔥 {streak}</Text>
                <Text style={streakStyles.statLabel}>Current</Text>
              </View>
              <View style={streakStyles.statBadgeGold}>
                <Text style={streakStyles.statBadgeText}>🏆 {bestStreak}</Text>
                <Text style={streakStyles.statLabel}>Best</Text>
              </View>
              <View style={streakStyles.statBadgeGreen}>
                <Text style={streakStyles.statBadgeText}>✅ {total}</Text>
                <Text style={streakStyles.statLabel}>Total</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};
