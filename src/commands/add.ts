import inquirer from "inquirer";
import { COMPONENTS } from "../utils/component-list.js";
import chalk from "chalk";
import { loadConfig } from "../utils/load-config.js";
import { installDependencies } from "../utils/install-dependencies.js";
import { createComponent } from "../utils/create-component.js";

export async function addComponent(
  components: string[],
  options: { all?: boolean },
) {
  console.log(chalk.blue.bold("\n📦 Adicionando componentes...\n"));

  let selectedComponents: string[] = components;

  // Se --all, adicionar todos
  if (options.all) {
    selectedComponents = Object.keys(COMPONENTS);
  }
  // Se nenhum componente foi especificado, mostrar lista interativa
  else if (!components || components.length === 0) {
    const answers = await inquirer.prompt([
      {
        type: "checkbox",
        name: "selectedComponents",
        message: "Selecione os componentes que deseja adicionar:",
        choices: Object.entries(COMPONENTS).map(([key, comp]) => ({
          name: `${comp.name} - ${comp.description}`,
          value: key,
        })),
      },
    ]);

    selectedComponents = answers.selectedComponents;
  }

  if (selectedComponents.length === 0) {
    console.log(chalk.yellow("Nenhum componente selecionado."));
    return;
  }

  // Ler configuração
  const config = await loadConfig();
  const targetPath = config.componentsPath;

  // Coletar todas as dependências necessárias
  const allDeps = new Set<string>();
  for (const comp of selectedComponents) {
    if (COMPONENTS[comp]) {
      COMPONENTS[comp].dependencies.forEach((dep) => allDeps.add(dep));
    }
  }

  // Instalar dependências
  if (allDeps.size > 0) {
    await installDependencies([...allDeps]);
  }

  // Copiar componentes
  console.log(chalk.blue("\n📝 Criando arquivos de componentes...\n"));

  for (const comp of selectedComponents) {
    if (COMPONENTS[comp]) {
      await createComponent(comp, targetPath);
    } else {
      console.log(chalk.yellow(`⚠ Componente "${comp}" não encontrado`));
    }
  }

  console.log(chalk.green.bold("\n✨ Componentes adicionados com sucesso!\n"));
  console.log(
    chalk.gray("Você já pode importar e usar os componentes no seu projeto."),
  );
  console.log(chalk.blue("\n💡 Exemplo de uso:"));
  console.log(
    chalk.gray(`  import { Button } from '@/components/ui/button';\n`),
  );
}
