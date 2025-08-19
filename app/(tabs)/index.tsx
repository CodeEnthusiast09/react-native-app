import { HabitCards } from "@/components/habit-card/index.";
import { useHabits, useLogout } from "@/hooks/services";
import { todaysHabitStyles } from "@/styles/todays-habit-styles";
import { ScrollView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { data: habits, isPending } = useHabits();

  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  return (
    <SafeAreaView style={todaysHabitStyles.container}>
      {/* <StatusBar backgroundColor="#f5f5f5" /> */}
      <View style={todaysHabitStyles.header}>
        <Text variant="headlineSmall" style={todaysHabitStyles.title}>
          Today&apos;s Habits
        </Text>
        <Button onPress={logout} loading={isLoggingOut} icon={"logout"}>
          Sign out
        </Button>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        
          <HabitCards data={habits ?? []} isLoading={isPending} />
      </ScrollView>
    </SafeAreaView>
  );
}
