import { SkeletonWrapper } from "@/components/skeleton/wrapper";
import { StreakCard } from "@/interfaces/habit-card";
import { View } from "react-native";
import { RankingSection } from "./ranking";
import { StreakList } from "./streak-list";

export const StreaksCard = ({ data, isLoading = false }: StreakCard) => {
  if (isLoading) {
    return (
      <View>
        {[...Array(3)].map((_, idx) => (
          <SkeletonWrapper key={idx} isLoading height={100} borderRadius={12} />
        ))}
      </View>
    );
  }

  return (
    <View>
      <RankingSection rankedHabits={data} />
      <StreakList rankedHabits={data} />
    </View>
  );
};
