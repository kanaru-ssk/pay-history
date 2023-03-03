import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    video: false,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      on("task", {
        log(message) {
          console.log("    ", message);
          return null;
        },
      });
    },
  },
});
