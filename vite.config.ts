import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import path from "path";

function loadDevVars(): Record<string, string> {
  const p = resolve(process.cwd(), ".dev.vars");
  if (!existsSync(p)) return {};
  const lines = readFileSync(p, "utf8").split("\n");
  const vars: Record<string, string> = {};
  for (const line of lines) {
    const idx = line.indexOf("=");
    if (idx > 0) {
      const key = line.slice(0, idx).trim();
      const val = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
      if (key && val) vars[key] = val;
    }
  }
  return vars;
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    cloudflare({ config: { vars: loadDevVars() } }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@core": path.resolve(__dirname, "./src/core"),
      "@features": path.resolve(__dirname, "./src/features"),
    },
  },
});
