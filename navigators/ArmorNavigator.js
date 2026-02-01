import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ArmorListScreen from "../screens/armor/ArmorListScreen";
import ArmorDetailScreen from "../screens/armor/ArmorDetailScreen";

const Stack = createNativeStackNavigator();

export default function ArmorNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ArmorList"
        component={ArmorListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ArmorDetail"
        component={ArmorDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
