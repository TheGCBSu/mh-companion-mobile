import * as FileSystem from "expo-file-system/legacy";
import { Asset } from "expo-asset";
import XLSX from "xlsx";

export async function loadMonsters() {
  try {
    const asset = Asset.fromModule(require("../assets/monsterdata.xlsx"));
    await asset.downloadAsync();

    const fileUri = asset.localUri ?? asset.uri;

    const base64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: "base64",
    });

    const workbook = XLSX.read(base64, { type: "base64" });

    const sheetName = workbook.SheetNames[0];
    const rawData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
      header: 1, // 2D array
    });

    // Process rows: skip fully empty rows, fill blanks with '_'
    const structuredRows = rawData
      .filter((row) =>
        row.some(
          (cell) =>
            cell !== null &&
            cell !== undefined &&
            cell !== "" &&
            cell !== "0" &&
            cell !== 0,
        ),
      ) // skip fully empty
      .map((row) =>
        row.map((cell) =>
          cell === null || cell === undefined || cell === "" ? "_" : cell,
        ),
      );

    // Optional: log for inspection
    // console.log("--- XLSX Structure ---");
    // structuredRows.forEach((row, index) => {
    //   console.log(`Row ${index}:`, row);
    // });

    return structuredRows;
  } catch (err) {
    console.error("Error loading XLSX data:", err);
    return [];
  }
}
