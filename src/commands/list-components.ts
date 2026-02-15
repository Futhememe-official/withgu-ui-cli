import chalk from "chalk";
import { COMPONENTS } from "../utils/component-list";

export function listComponents() {
  console.log(chalk.blue.bold("\n📚 Componentes disponíveis:\n"));

  Object.entries(COMPONENTS).forEach(([key, comp]) => {
    console.log(chalk.green(`• ${comp.name}`) + chalk.gray(` (${key})`));
    console.log(chalk.gray(`  ${comp.description}`));
    console.log(chalk.gray(`  Arquivos: ${comp.files.join(", ")}`));
    console.log();
  });

  console.log(chalk.blue("💡 Para adicionar:"));
  console.log(chalk.gray("  myui add <component-name>"));
  console.log(chalk.gray("  myui add button card input"));
  console.log(chalk.gray("  myui add --all (todos os componentes)\n"));
}
