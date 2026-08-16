import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  // The project site is deployed at kilofitness.github.io/KiloFitnessWebsite/.
  // Keep the local development server available at localhost:5173/.
  base: mode === "github-pages" ? "/KiloFitnessWebsite/" : "/",
  plugins: [react()],
}));
