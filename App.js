import { NavigationContainer } from "@react-navigation/native";
import MonsterNavigator from "./navigators/MonsterNavigator";
import ArmorNavigator from "./navigators/ArmorNavigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Styles, Colors } from "./theme";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.surface },
          headerTintColor: Colors.accent,
          tabBarStyle: { backgroundColor: Colors.surface },
          tabBarActiveTintColor: Colors.accent,
          tabBarInactiveTintColor: Colors.muted,
        }}
      >
        <Tab.Screen
          name="Monsters"
          component={MonsterNavigator}
          options={{ headerShown: true }}
        />
        <Tab.Screen
          name="Armor"
          component={ArmorNavigator}
          options={{ headerShown: true }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
