import type { HabitWithStreak } from "@/interfaces";
import { streakStyles } from "@/styles/streak-style";
import { View } from "react-native";
import { Text } from "react-native-paper";

interface RankingSectionProps {
  rankedHabits: HabitWithStreak[];
}

export const RankingSection = ({ rankedHabits }: RankingSectionProps) => {
  const badgeStyles = [
    streakStyles.badge1,
    streakStyles.badge2,
    streakStyles.badge3,
  ];

  if (!rankedHabits || rankedHabits.length === 0) {
    return null;
  }

  return (
    <View style={streakStyles.rankingContainer}>
      <Text style={streakStyles.rankingTitle}>🏅 Top Streaks</Text>
      {rankedHabits.slice(0, 3).map((item, key) => (
        <View key={key} style={streakStyles.rankingRow}>
          <View style={[streakStyles.rankingBadge, badgeStyles[key]]}>
            <Text style={streakStyles.rankingBadgeText}>{key + 1}</Text>
          </View>
          <Text style={streakStyles.rankingHabit}>{item.habit.title}</Text>
          <Text style={streakStyles.rankingStreak}>
            Best: {item.bestStreak}
          </Text>
        </View>
      ))}
    </View>
  );
};
