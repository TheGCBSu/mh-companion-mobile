import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MonsterListScreen from "../screens/monster/MonsterListScreen";
import MonsterDetailScreen from "../screens/monster/MonsterDetailScreen";

const Stack = createNativeStackNavigator();

export default function MonsterNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MonsterList"
        component={MonsterListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MonsterDetail"
        component={MonsterDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
