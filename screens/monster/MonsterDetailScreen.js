import { ScrollView, View, Text, Switch } from "react-native";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Styles } from "../../theme";

export default function MonsterDetailScreen({ route }) {
  const { id } = route.params;
  const monster = useSelector((s) => s.monsters.monstersById[id]);
  const [mixedView, setMixedView] = useState(false);

  if (!monster) {
    return (
      <View style={[Styles.container, { paddingTop: 40, paddingBottom: 80 }]}>
        <Text style={Styles.text}>Monster not found</Text>
      </View>
    );
  }

  const physicalHeaders = ["Sever", "Blunt", "Ranged", "Stun"];
  const elementalHeaders = ["Fire", "Water", "Ice", "Thunder", "Dragon"];
  const mixedHeaders = [
    "Sever",
    "Blunt",
    "Ranged",
    "Stun",
    "Fire",
    "Water",
    "Ice",
    "Thunder",
    "Dragon",
  ];

  const firstColumnWidth = 120;
  const columnWidth = 80;

  const renderRowCells = (headers, part, startIdx = 0) =>
    headers.map((_, colIdx) => (
      <View
        key={colIdx}
        style={[Styles.tableCellContainer, { width: columnWidth }]}
      >
        <Text style={Styles.tableCell}>
          {String(part[startIdx + colIdx] ?? "")}
        </Text>
      </View>
    ));

  const renderTable = (headers, startIdx = 0) => (
    <View style={{ flexDirection: "row" }}>
      {/* Sticky first column */}
      <View>
        <View style={[Styles.tableRow, Styles.tableHeader]}>
          <View
            style={[Styles.tableCellContainer, { width: firstColumnWidth }]}
          >
            <Text style={Styles.tableHeaderText}>Part + State</Text>
          </View>
        </View>
        {monster.parts.map((part, idx) => (
          <View
            key={part[0] + idx + "-col"}
            style={[
              Styles.tableRow,
              idx % 2 === 0 ? Styles.tableRowEven : Styles.tableRowOdd,
            ]}
          >
            <View
              style={[Styles.tableCellContainer, { width: firstColumnWidth }]}
            >
              <Text style={Styles.tableCell}>
                {`${part[0] ?? ""} ${part[1] ?? ""}`}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Scrollable table */}
      <ScrollView horizontal showsHorizontalScrollIndicator>
        <View>
          {/* Header */}
          <View style={[Styles.tableRow, Styles.tableHeader]}>
            {headers.map((h, idx) => (
              <View
                key={idx}
                style={[Styles.tableCellContainer, { width: columnWidth }]}
              >
                <Text style={Styles.tableHeaderText}>{h}</Text>
              </View>
            ))}
          </View>

          {/* Rows */}
          {monster.parts.map((part, idx) => (
            <View
              key={part[0] + idx + "-row"}
              style={[
                Styles.tableRow,
                idx % 2 === 0 ? Styles.tableRowEven : Styles.tableRowOdd,
              ]}
            >
              {renderRowCells(headers, part, startIdx)}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  return (
    <ScrollView
      style={[Styles.container, { paddingTop: 10, paddingBottom: 40 }]}
    >
      <Text style={[Styles.text, { fontSize: 28, marginBottom: 16 }]}>
        {monster.name}
      </Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}
      >
        <Text style={Styles.text}>{mixedView ? "Mixed View" : "Split"}:</Text>
        <Switch value={mixedView} onValueChange={setMixedView} />
      </View>

      {mixedView ? (
        renderTable(mixedHeaders, 2)
      ) : (
        <>
          <Text style={[Styles.text, { fontSize: 20, marginBottom: 4 }]}>
            Physical
          </Text>
          {renderTable(physicalHeaders, 2)}

          <Text
            style={[
              Styles.text,
              { fontSize: 20, marginTop: 16, marginBottom: 4 },
            ]}
          >
            Elemental
          </Text>
          {renderTable(elementalHeaders, 5)}
        </>
      )}
    </ScrollView>
  );
}
