import { useState, useMemo } from "react";
import { FlatList, View } from "react-native";
import { Button, List, Divider, TextInput } from "react-native-paper";
import { Styles, Colors } from "../../theme";

const MOCK_ARMOR = [
  { id: "rathalos-helm", name: "Rathalos Helm" },
  { id: "rathalos-mail", name: "Rathalos Mail" },
  { id: "rathalos-legs", name: "Rathalos Legs" },
];

export default function ArmorListScreen({ navigation }) {
  const [filterText, setFilterText] = useState("");

  const filteredArmor = useMemo(() => {
    const lower = filterText.toLowerCase();
    return MOCK_ARMOR.filter((a) => a.name.toLowerCase().includes(lower));
  }, [filterText]);

  return (
    <View style={Styles.container}>
      <TextInput
        placeholder="Search armor..."
        placeholderTextColor={Colors.muted}
        value={filterText}
        onChangeText={setFilterText}
        style={Styles.input}
      />

      <Button mode="contained" onPress={() => {}} style={Styles.button}>
        Reload Armor
      </Button>

      <FlatList
        data={filteredArmor}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Divider style={Styles.divider} />}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            onPress={() => navigation.navigate("ArmorDetail", { id: item.id })}
            titleStyle={{ ...Styles.text, fontSize: 16 }}
            style={Styles.listItem}
          />
        )}
      />
    </View>
  );
}
