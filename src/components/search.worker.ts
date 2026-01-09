/// <reference lib="webworker" />
import Fuse from "fuse.js";
import { openDB } from "idb";

await openDB("words-db", 3, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("words")) {
      db.createObjectStore("words", { keyPath: "length" });
    }
  },
});

const getWords = async (length: number) => {
  const db = await openDB("words-db", 3);
  const data = await db.get("words", length);
  if (!data) {
    const response = await fetch(`/data/${length}.json`);
    if (!response.ok) throw new Error("Failed to fetch data");
    const words = await response.json();

    const tx = db.transaction("words", "readwrite");
    await tx.store.put({ length, words });
    await tx.done;
    return words;
  } else {
    return data.words;
  }
};

const filterByPrefix = (words: string[], prefix: string) => {
  const fuse = new Fuse(words, {
    includeScore: true,
    useExtendedSearch: true,
  });

  let results = fuse.search(`^${prefix}`);
  return results.map((x) => x.item);
};

self.onmessage = async (
  event: MessageEvent<{ prefix: string; length: number; letters: string }>
) => {
  let length = event.data.length;
  if (length < 2 || length > 15) {
    self.postMessage({ error: "Length must be between 2 and 15" });
    return;
  }

  try {
    let words: string[] = await getWords(length);
    const prefix = event.data.prefix.split(".")[0] as string;

    if (prefix.length > 0) {
      words = filterByPrefix(words, prefix);
    }

    if (event.data.prefix.includes(".")) {
      let pattern = event.data.prefix.replace(/\.+$/, ""); // trim trailing dots
      pattern = pattern.replaceAll(".", "\\p{L}");

      const regex = new RegExp(`^${pattern}`, "u");
      words = words.filter((x) => regex.test(x));
    }

    if (event.data.letters) {
      words = words.filter((x) =>
        x.split("").every((char) => event.data.letters.includes(char))
      );
    }
    self.postMessage({ results: words.map((x) => ({ word: x })) });
  } catch (error: any) {
    self.postMessage({ error: error.message });
  }
};
