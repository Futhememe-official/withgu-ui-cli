import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs-extra";
import { ProjectConfig } from "../utils/load-config.js";

export async function initProject() {
  console.log(chalk.blue.bold("\n🚀 Inicializando configuração...\n"));

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "componentsPath",
      message: "Onde você quer instalar os componentes?",
      default: "src/components/ui",
    },
    {
      type: "confirm",
      name: "typescript",
      message: "Você está usando TypeScript?",
      default: true,
    },
    {
      type: "confirm",
      name: "tailwind",
      message: "Você está usando Tailwind CSS?",
      default: true,
    },
  ]);

  // Criar arquivo de configuração
  const config: ProjectConfig = {
    componentsPath: answers.componentsPath,
    typescript: answers.typescript,
    tailwind: answers.tailwind,
  };

  await fs.writeJson("components.json", config, { spaces: 2 });

  console.log(chalk.green("\n✓ Configuração criada com sucesso!"));
  console.log(chalk.gray(`\nArquivo criado: components.json`));

  // Sugerir próximos passos
  console.log(chalk.blue("\n📝 Próximos passos:"));
  console.log(chalk.gray("  1. Execute: myui add <component>"));
  console.log(
    chalk.gray("  2. Ou: myui list (para ver componentes disponíveis)"),
  );
}
