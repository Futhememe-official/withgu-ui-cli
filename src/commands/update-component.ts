import chalk from "chalk";
import { loadConfig } from "../utils/load-config.js";
import { COMPONENTS } from "../utils/component-list.js";
import path from "path";
import fs from "fs-extra";
import inquirer from "inquirer";
import { createComponent } from "../utils/create-component.js";

export async function updateComponent(components: string[]) {
  console.log(chalk.blue.bold("\n🔄 Atualizando componentes...\n"));

  const config = await loadConfig();
  const targetPath = config.componentsPath;

  let componentsToUpdate: string[] = components;

  // Se nenhum foi especificado, atualizar todos que existem
  if (!components || components.length === 0) {
    componentsToUpdate = [];
    for (const [key, comp] of Object.entries(COMPONENTS)) {
      const exists = comp.files.some((file) =>
        fs.existsSync(path.join(targetPath, file)),
      );
      if (exists) {
        componentsToUpdate.push(key);
      }
    }
  }

  if (componentsToUpdate.length === 0) {
    console.log(chalk.yellow("Nenhum componente para atualizar."));
    return;
  }

  console.log(
    chalk.gray(`Componentes a atualizar: ${componentsToUpdate.join(", ")}\n`),
  );

  const { confirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: "Isso irá sobrescrever os arquivos existentes. Continuar?",
      default: false,
    },
  ]);

  if (!confirm) {
    console.log(chalk.yellow("Operação cancelada."));
    return;
  }

  for (const comp of componentsToUpdate) {
    if (COMPONENTS[comp]) {
      await createComponent(comp, targetPath);
    }
  }

  console.log(chalk.green.bold("\n✨ Componentes atualizados com sucesso!\n"));
}
