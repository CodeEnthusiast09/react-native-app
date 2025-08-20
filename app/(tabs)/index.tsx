import { HabitsCard } from "@/components/habit-card/index.";
import {
  useHabits,
  useHabitsCompletedToday,
  useLogout,
} from "@/hooks/services";
import { todaysHabitStyles } from "@/styles/todays-habit-styles";
import { ScrollView, View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function Index() {
  const { data: habits, isPending } = useHabits();

  const { data: completedHabits } = useHabitsCompletedToday();

  const completedIds = completedHabits?.map((h) => h.habitId) ?? [];

  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  return (
    <View style={todaysHabitStyles.container}>
      <View style={todaysHabitStyles.header}>
        <Text variant="headlineSmall" style={todaysHabitStyles.title}>
          Today&apos;s Habits
        </Text>
        <Button onPress={logout} loading={isLoggingOut} icon={"logout"}>
          Sign out
        </Button>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <HabitsCard
          data={habits ?? []}
          isLoading={isPending}
          completedHabits={completedIds}
        />
      </ScrollView>
    </View>
  );
}
