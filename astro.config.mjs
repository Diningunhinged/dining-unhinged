// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://diningunhinged.github.io",
  base: "/dining-unhinged",

  vite: {
    plugins: [tailwindcss()],
  },
});