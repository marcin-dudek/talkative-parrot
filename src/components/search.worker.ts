/// <reference lib="webworker" />
import Fuse from "fuse.js";
import { openDB } from 'idb';

await openDB('words-db', 3, {
    upgrade(db) {
        if (!db.objectStoreNames.contains('words')) {
            db.createObjectStore('words', { keyPath: "length" });
        }
    }
});

self.onmessage = async (event: MessageEvent) => {
    let length = parseInt(event.data.length ?? "0");
    if (length < 1 || length > 15) {
        self.postMessage({ error: "Length must be between 1 and 15" });
        return;
    }
    try {
        let words: string[];
        const db = await openDB('words-db', 3);
        const data = await db.get('words', length);
        if (!data) {
            const response = await fetch(`/data/${length}.json`);
            if (!response.ok) throw new Error("Failed to fetch data");
            words = await response.json();

            const tx = db.transaction('words', 'readwrite');
            await tx.store.put({ length, words });
            await tx.done;
        } else {
            words = data.words;
        }

        const fuse = new Fuse(words, {
            includeScore: true,
            useExtendedSearch: true,
        });

        const result = fuse.search(`^${event.data.word}`);
        self.postMessage({ results: result });
    } catch (error: any) {
        self.postMessage({ error: error.message });
    }
};
