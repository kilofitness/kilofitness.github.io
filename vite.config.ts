import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // This is the GitHub Pages account site: https://kilofitness.github.io/.
  base: "/",
  plugins: [react()],
});
