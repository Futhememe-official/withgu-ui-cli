import fs from "fs-extra";

export function detectPackageManager(): string {
  if (fs.existsSync("yarn.lock")) return "yarn";
  if (fs.existsSync("pnpm-lock.yaml")) return "pnpm";
  if (fs.existsSync("bun.lockb")) return "bun";
  return "npm";
}
