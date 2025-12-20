const worker = new Worker(new URL("./search.worker.ts", import.meta.url), {
  type: "module",
});

export default worker;
