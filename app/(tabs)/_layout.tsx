import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#1e3653" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTintColor: "#1e3653",
          tabBarIcon: ({ color, focused }) => {
            return focused ? (
              <Ionicons name="home" size={24} color={color} />
            ) : (
              <Octicons name="home" size={24} color={color} />
            );
          },
        }}
      />

      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          headerTintColor: "#1e3653",

          tabBarIcon: ({ color }) => (
            <MaterialIcons name="login" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
