import { View, Text } from "react-native";

export default function ArmorDetailScreen({ route }) {
  const { id } = route.params;

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24 }}>Armor Details</Text>
      <Text>ID: {id}</Text>
      <Text>(Mock data for now)</Text>
    </View>
  );
}
