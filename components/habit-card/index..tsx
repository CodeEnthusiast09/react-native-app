import { SkeletonWrapper } from "@/components/skeleton/wrapper";
import { HabitCard } from "@/interfaces/habit-card";
import { todaysHabitStyles } from "@/styles/todays-habit-styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { View } from "react-native";
import { Surface, Text } from "react-native-paper";

export const HabitCards = ({ data, isLoading = false }: HabitCard) => {
  if (isLoading) {
    return (
      <View>
        {[...Array(3)].map((_, idx) => (
          <SkeletonWrapper key={idx} isLoading height={100} borderRadius={12} />
        ))}
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={todaysHabitStyles.emptyState}>
        <MaterialCommunityIcons
          name="calendar-today"
          size={64}
          color="#b0b0b0"
          style={{ marginBottom: 16 }}
        />
        <Text style={todaysHabitStyles.emptyStateTitle}>No habits yet</Text>
        <Text style={todaysHabitStyles.emptyStateSubtitle}>
          Add your first habit to get started!
        </Text>
      </View>
    );
  }

  return (
    <View>
      {data.map((habit) => (
        <Surface key={habit.id} style={todaysHabitStyles.card} elevation={0}>
          <View style={todaysHabitStyles.cardContent}>
            <Text style={todaysHabitStyles.cardTitle}>{habit.title}</Text>
            <Text style={todaysHabitStyles.cardDescription}>
              {habit.description}
            </Text>
            <View style={todaysHabitStyles.cardFooter}>
              <View style={todaysHabitStyles.streakBadge}>
                <MaterialCommunityIcons
                  name="fire"
                  size={18}
                  color={"#ff9800"}
                />
                <Text style={todaysHabitStyles.streakText}>
                  {habit.streak} day streak
                </Text>
              </View>
              <View style={todaysHabitStyles.frequencyBadge}>
                <Text style={todaysHabitStyles.frequencyText}>
                  {habit.frequency.charAt(0).toUpperCase() +
                    habit.frequency.slice(1)}
                </Text>
              </View>
            </View>
          </View>
        </Surface>
      ))}
    </View>
  );
};
