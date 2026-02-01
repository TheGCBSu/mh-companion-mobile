import { useState, useMemo } from "react";
import { ActivityIndicator, FlatList, View, Text } from "react-native";
import { Button, List, Divider, TextInput } from "react-native-paper";

import { useMonstersLoader } from "../../helpers/useLoadMonsters";
import { useSelector } from "react-redux";
import { Styles, Colors } from "../../theme";

export default function MonsterListScreen({ navigation }) {
  const { reloadMonsters } = useMonstersLoader();
  const ids = useSelector((s) => s.monsters.monsterIds);
  const byId = useSelector((s) => s.monsters.monstersById);
  const [filterText, setFilterText] = useState("");

  // Memoize unique IDs and apply filter
  const memoizedIds = useMemo(() => {
    const seen = new Map();

    // store only the first occurrence of each ID
    ids.forEach((id) => {
      if (!seen.has(id)) {
        seen.set(id, byId[id]);
      }
    });

    const lowerFilter = filterText.toLowerCase();
    const filteredIds = Array.from(seen.keys()).filter((id) => {
      const name = byId[id]?.name.toLowerCase() ?? "";
      return name.includes(lowerFilter);
    });

    return filteredIds;
  }, [ids, byId, filterText]);

  if (!ids || ids.length === 0) {
    // Show loading spinner while data is being fetched
    return (
      <View style={Styles.container}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={{ marginTop: 12 }}>Loading monsters...</Text>
      </View>
    );
  }

  return (
    <View style={Styles.container}>
      <TextInput
        placeholder="Search monsters..."
        placeholderTextColor={Colors.muted}
        value={filterText}
        onChangeText={setFilterText}
        style={Styles.input}
      />

      <Button mode="contained" onPress={reloadMonsters} style={Styles.button}>
        <Text style={Styles.buttonText}> Reload Monsters</Text>
      </Button>

      <FlatList
        data={memoizedIds}
        keyExtractor={(id) => id}
        ItemSeparatorComponent={() => <Divider style={Styles.divider} />}
        renderItem={({ item: id }) => (
          <List.Item
            title={byId[id]?.name ?? id}
            onPress={() => navigation.navigate("MonsterDetail", { id })}
            titleStyle={{ ...Styles.text, fontSize: 16 }}
            style={Styles.listItem}
          />
        )}
      />
    </View>
  );
}
