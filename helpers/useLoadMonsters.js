import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCompiledMonsters } from "../redux/monstersSlice";
import { loadMonsters } from "./loadMonsters";

function isBlank(cell) {
  return cell === null || cell === undefined || cell === "";
}

/**
 * Compile monsters with strict rules:
 * - first row, first cell = monster name
 * - second row = headers, take first 11 columns only
 * - part rows = first 11 columns
 * - stop when "Averages" is detected
 */
export function compileMonstersStrict(sheet) {
  const byId = {};
  const ids = [];
  let i = 0;

  while (i < sheet.length) {
    const row = sheet[i];
    if (!row || row.length === 0) {
      i++;
      continue;
    }

    const monsterName = row[0]?.toString().trim();
    if (
      !monsterName ||
      ["averages", "chest"].includes(monsterName.toLowerCase())
    ) {
      i++;
      continue;
    }

    // Next row is headers
    const headerRow = sheet[i + 1]
      ?.slice(0, 11)
      .map((c) => (isBlank(c) ? "_" : c));
    i += 2; // move to first part row

    const parts = [];
    while (i < sheet.length) {
      const partRow = sheet[i];
      if (!partRow || partRow.length === 0) {
        i++;
        continue;
      }

      const firstCell = partRow[0]?.toString().trim();
      if (!firstCell || firstCell.toLowerCase() === "averages") break; // end of monster

      parts.push(partRow.slice(0, 11).map((c) => (isBlank(c) ? "_" : c)));
      i++;
    }

    const id = monsterName.toLowerCase().replace(/\s+/g, "-");
    byId[id] = {
      id,
      name: monsterName,
      headers: headerRow,
      parts,
    };
    ids.push(id);
  }

  return { byId, ids };
}

export function useMonstersLoader() {
  const dispatch = useDispatch();
  const monsters = useSelector((state) => state.monsters.monsterIds);

  // Load if empty
  useEffect(() => {
    if (!monsters || monsters.length === 0) {
      loadAndDispatch();
    }
  }, []);

  // Function to manually reload
  const loadAndDispatch = useCallback(async () => {
    const sheet = await loadMonsters();

    const compiled = compileMonstersStrict(sheet);
    dispatch(setCompiledMonsters(compiled));
  }, [dispatch]);

  return { reloadMonsters: loadAndDispatch, isLoaded: monsters.length > 0 };
}
