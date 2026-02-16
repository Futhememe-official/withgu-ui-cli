import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs-extra";
import { ProjectConfig } from "../utils/load-config.js";
import { createUtils } from "../utils/create-utils.js";

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
      type: "input",
      name: "utilsPath",
      message: "Onde você quer instalar os utils?",
      default: "src/lib",
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
    utilsPath: answers.utilsPath,
    typescript: answers.typescript,
    tailwind: answers.tailwind,
  };

  try {
    await createUtils(config.utilsPath);
  } catch {
    console.log(
      chalk.red("\n Não foi possivel criar pasta `lib` para inserir os utils"),
    );
  }

  await fs.writeJson("components.json", config, { spaces: 2 });

  console.log(chalk.green("\n✓ Configuração criada com sucesso!"));
  console.log(chalk.gray(`\nArquivo criado: components.json`));
  console.log(chalk.gray(`\nArquivo criado: utils.ts`));

  // Sugerir próximos passos
  console.log(chalk.blue("\n📝 Próximos passos:"));
  console.log(chalk.gray("  1. Execute: @withgu/ui-cli add <component>"));
  console.log(
    chalk.gray(
      "  2. Ou: @withgu/ui-cli list (para ver componentes disponíveis)",
    ),
  );
}
