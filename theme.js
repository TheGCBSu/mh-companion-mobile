// theme.js
import { StyleSheet } from "react-native";

export const Colors = {
  primary: "#4A90E2", // default MH blue
  accent: "#FFB800", // maybe like monster drops/gold
  background: "#1E1E1E", // dark base
  surface: "#2A2A2A", // card/list background
  text: "#F0F0F0", // light text
  muted: "#888888", // secondary text
  border: "#444444",
};

export const Fonts = {
  regular: "System",
  heading: "System", // later can replace with MH-ish font
  monospace: "Courier",
};

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: Colors.background,
  },
  text: {
    color: Colors.text,
    fontFamily: Fonts.regular,
    fontSize: 16,
  },
  heading: {
    color: Colors.accent,
    fontFamily: Fonts.heading,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  button: {
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.primary,
  },
  buttonText: {
    color: Colors.text,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 6,
    padding: 10,
    color: Colors.text,
    backgroundColor: Colors.text,
    marginBottom: 12,
  },
  listItem: {
    backgroundColor: Colors.surface,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 2,
  },
  tableRow: { flexDirection: "row", minHeight: 36 },
  tableRowEven: { backgroundColor: Colors.rowEven },
  tableRowOdd: { backgroundColor: Colors.rowOdd },
  tableHeader: {
    backgroundColor: Colors.header,
    borderBottomWidth: 1,
    borderColor: Colors.divider,
  },
  tableCellContainer: { padding: 6, minWidth: 80, justifyContent: "center" },
  tableCell: { textAlign: "center", color: Colors.text },
  tableHeaderText: { fontWeight: "bold", color: Colors.text },
});
