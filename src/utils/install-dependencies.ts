import ora from "ora";
import { detectPackageManager } from "./detect-package-manager.js";
import { execSync } from "child_process";

export async function installDependencies(deps: string[]): Promise<void> {
  if (deps.length === 0) return;

  const spinner = ora("Instalando dependências...").start();

  try {
    const packageManager = detectPackageManager();

    const installCmd =
      packageManager === "yarn"
        ? "yarn add"
        : packageManager === "pnpm"
          ? "pnpm add"
          : packageManager === "bun"
            ? "bun add"
            : "npm install";

    execSync(`${installCmd} ${deps.join(" ")}`, { stdio: "inherit" });
    spinner.succeed("Dependências instaladas com sucesso!");
  } catch (error) {
    spinner.fail("Erro ao instalar dependências");
    throw error;
  }
}
