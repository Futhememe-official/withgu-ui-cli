import chalk from "chalk";
import { loadConfig } from "../utils/load-config.js";
import { COMPONENTS } from "../utils/component-list.js";
import path from "path";
import fs from "fs-extra";

export async function removeComponent(components: string[]) {
  console.log(chalk.blue.bold("\n🗑️  Removendo componentes...\n"));

  const config = await loadConfig();
  const targetPath = config.componentsPath;

  for (const comp of components) {
    if (COMPONENTS[comp]) {
      for (const file of COMPONENTS[comp].files) {
        const filePath = path.join(targetPath, file);

        if (fs.existsSync(filePath)) {
          await fs.remove(filePath);
          console.log(chalk.yellow(`✓ Removido: ${filePath}`));
        } else {
          console.log(chalk.gray(`  Arquivo não existe: ${filePath}`));
        }
      }
    } else {
      console.log(chalk.red(`✗ Componente "${comp}" não encontrado`));
    }
  }

  console.log(chalk.green.bold("\n✨ Componentes removidos!\n"));
}
