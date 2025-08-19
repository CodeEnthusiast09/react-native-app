// import { SkeletonWrapper } from "@/components/skeleton/wrapper";
// import { useDeleteHabit } from "@/hooks/services";
// import { HabitCard } from "@/interfaces/habit-card";
// import { todaysHabitStyles } from "@/styles/todays-habit-styles";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import { useRef, useState } from "react";
// import { View } from "react-native";
// import { Swipeable } from "react-native-gesture-handler";
// import { Surface, Text } from "react-native-paper";

// export const HabitCards = ({ data, isLoading = false }: HabitCard) => {
//   const swipeableRefs = useRef<{ [key: string]: Swipeable | null }>({});

//   const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

//   const { mutate: deleteHabit } = useDeleteHabit(() => {
//     setDeletingIds(new Set());
//   });

//   const handleDeleteHabit = (habitId: string) => {
//     setDeletingIds((prev) => new Set([...prev, habitId]));
//     deleteHabit({ habitId });
//   };

//   const renderLeftActions = (habitId: string) => (
//     <View style={todaysHabitStyles.swipeActionLeft}>
//       <MaterialCommunityIcons
//         name={deletingIds.has(habitId) ? "loading" : "trash-can-outline"}
//         size={32}
//         color={"#fff"}
//       />
//     </View>
//   );

//   const renderRightActions = () => (
//     <View style={todaysHabitStyles.swipeActionRight}>
//       <MaterialCommunityIcons
//         name="check-circle-outline"
//         size={32}
//         color={"#fff"}
//       />
//     </View>
//   );

//   if (isLoading) {
//     return (
//       <View>
//         {[...Array(3)].map((_, idx) => (
//           <SkeletonWrapper key={idx} isLoading height={100} borderRadius={12} />
//         ))}
//       </View>
//     );
//   }

//   if (!data || data.length === 0) {
//     return (
//       <View style={todaysHabitStyles.emptyState}>
//         <MaterialCommunityIcons
//           name="calendar-today"
//           size={64}
//           color="#b0b0b0"
//           style={{ marginBottom: 16 }}
//         />
//         <Text style={todaysHabitStyles.emptyStateTitle}>No habits yet</Text>
//         <Text style={todaysHabitStyles.emptyStateSubtitle}>
//           Add your first habit to get started!
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <View>
//       {data.map((habit) => (
//         <Swipeable
//           key={habit.id}
//           ref={(ref) => {
//             swipeableRefs.current[habit.id] = ref;
//           }}
//           overshootLeft={false}
//           overshootRight={false}
//           renderLeftActions={() => renderLeftActions(habit.id)}
//           renderRightActions={renderRightActions}
//           onSwipeableOpen={(direction) => {
//             if (direction === "left") {
//               handleDeleteHabit(habit.id);
//             }
//           }}
//           leftThreshold={100}
//         >
//           <Surface style={todaysHabitStyles.card} elevation={0}>
//             <View style={todaysHabitStyles.cardContent}>
//               <Text style={todaysHabitStyles.cardTitle}>{habit.title}</Text>
//               <Text style={todaysHabitStyles.cardDescription}>
//                 {habit.description}
//               </Text>
//               <View style={todaysHabitStyles.cardFooter}>
//                 <View style={todaysHabitStyles.streakBadge}>
//                   <MaterialCommunityIcons
//                     name="fire"
//                     size={18}
//                     color={"#ff9800"}
//                   />
//                   <Text style={todaysHabitStyles.streakText}>
//                     {habit.streak} day streak
//                   </Text>
//                 </View>
//                 <View style={todaysHabitStyles.frequencyBadge}>
//                   <Text style={todaysHabitStyles.frequencyText}>
//                     {habit.frequency.charAt(0).toUpperCase() +
//                       habit.frequency.slice(1)}
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </Surface>
//         </Swipeable>
//       ))}
//     </View>
//   );
// };

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRef } from "react";
import { View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Surface, Text } from "react-native-paper";

import { SkeletonWrapper } from "@/components/skeleton/wrapper";
import { useDeleteHabit } from "@/hooks/services";
import { HabitCard } from "@/interfaces/habit-card";
import { todaysHabitStyles } from "@/styles/todays-habit-styles";

export const HabitCards = ({ data, isLoading = false }: HabitCard) => {
  const swipeableRefs = useRef<{ [key: string]: Swipeable | null }>({});

  const { mutate: deleteHabit } = useDeleteHabit();

  const handleDeleteHabit = (habitId: string) => {
    deleteHabit({ habitId });
  };

  const renderLeftActions = () => (
    <View style={todaysHabitStyles.swipeActionLeft}>
      <MaterialCommunityIcons
        name={"trash-can-outline"}
        size={32}
        color={"#fff"}
      />
    </View>
  );

  const renderRightActions = () => (
    <View style={todaysHabitStyles.swipeActionRight}>
      <MaterialCommunityIcons
        name="check-circle-outline"
        size={32}
        color={"#fff"}
      />
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
          renderRightActions={renderRightActions}
          onSwipeableOpen={(direction) => {
            if (direction === "left") {
              handleDeleteHabit(habit.id);
            }
          }}
        >
          <Surface style={todaysHabitStyles.card} elevation={0}>
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
