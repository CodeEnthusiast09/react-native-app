import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRef } from "react";
import { View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Surface, Text } from "react-native-paper";

import { SkeletonWrapper } from "@/components/skeleton/wrapper";
import { useCompleteHabit, useDeleteHabit } from "@/hooks/services";
import { HabitCard } from "@/interfaces/habit-card";
import { todaysHabitStyles } from "@/styles/todays-habit-styles";

interface HabitsCardProps extends HabitCard {
  completedHabits?: string[];
}

export const HabitsCard = ({
  data,
  isLoading = false,
  completedHabits = [],
}: HabitsCardProps) => {
  const swipeableRefs = useRef<{ [key: string]: Swipeable | null }>({});

  const { mutate: deleteHabit } = useDeleteHabit();

  const { mutate: completeHabit } = useCompleteHabit();

  const handleDeleteHabit = (habitId: string) => {
    deleteHabit({ habitId });
  };

  const handleCompleteHabit = (habitId: string) => {
    completeHabit({ habitId });
    swipeableRefs.current[habitId]?.close();
  };

  const isHabitCompleted = (habitId: string) =>
    completedHabits?.includes(habitId);

  const renderLeftActions = () => (
    <View style={todaysHabitStyles.swipeActionLeft}>
      <MaterialCommunityIcons
        name={"trash-can-outline"}
        size={32}
        color={"#fff"}
      />
    </View>
  );

  const renderRightActions = (habitId: string) => (
    <View style={todaysHabitStyles.swipeActionRight}>
      {isHabitCompleted(habitId) ? (
        <Text style={{ color: "#fff" }}>Completed</Text>
      ) : (
        <MaterialCommunityIcons
          name="check-circle-outline"
          size={32}
          color={"#fff"}
        />
      )}
    </View>
  );

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
        <Swipeable
          key={habit.id}
          ref={(ref) => {
            swipeableRefs.current[habit.id] = ref;
          }}
          overshootLeft={false}
          overshootRight={false}
          renderLeftActions={renderLeftActions}
          renderRightActions={() => renderRightActions(habit.id)}
          onSwipeableOpen={(direction) => {
            if (direction === "left") {
              handleDeleteHabit(habit.id);
            } else if (direction === "right") {
              handleCompleteHabit(habit.id);
            }
          }}
        >
          <Surface
            style={[
              todaysHabitStyles.card,
              isHabitCompleted(habit.id) && todaysHabitStyles.completedCard,
            ]}
            elevation={0}
          >
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
        </Swipeable>
      ))}
    </View>
  );
};
