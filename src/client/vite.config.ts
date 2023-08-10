/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import express from "./express-plugin"; //Add this

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./setupTests.ts",
    // speed up since tests don't rely on css
    // https://github.com/vitest-dev/vitest/blob/main/examples/react-testing-lib/vite.config.ts#L14-L16
    css: false,
  },
  // Adjust this
  // express("src/server")
  // test: {
  //   globals: true,
  //   environment: "jsdom",
  //   setupFiles: "./setupTests.ts",
  // },
});
