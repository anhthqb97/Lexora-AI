import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true, tabBarActiveTintColor: "#1e3a5f" }}>
      <Tabs.Screen name="dashboard" options={{ title: "Home", tabBarLabel: "Home" }} />
      <Tabs.Screen name="speaking/index" options={{ title: "Speaking", tabBarLabel: "Speaking" }} />
      <Tabs.Screen name="toeic/index" options={{ title: "TOEIC", tabBarLabel: "TOEIC" }} />
    </Tabs>
  );
}
