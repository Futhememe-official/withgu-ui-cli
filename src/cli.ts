#!/usr/bin/env node

import { Command } from "commander";
import { initProject } from "./commands/init.js";
import { addComponent } from "./commands/add.js";
import { listComponents } from "./commands/list-components.js";
import { removeComponent } from "./commands/remove-component.js";
import { updateComponent } from "./commands/update-component.js";

const program = new Command();

// Comando: init
program
  .command("init")
  .description("Inicializar configuração da CLI no projeto")
  .action(initProject);

// Comando: add
program
  .command("add [components...]")
  .description("Adicionar componentes ao projeto")
  .option("-a, --all", "Adicionar todos os componentes")
  .action(addComponent);

// Comando: list
program
  .command("list")
  .description("Listar todos os componentes disponíveis")
  .action(listComponents);

// Comando: remove
program
  .command("remove <components...>")
  .description("Remover componentes do projeto")
  .action(removeComponent);

// Comando: update
program
  .command("update [components...]")
  .description("Atualizar componentes existentes")
  .action(updateComponent);

// Configuração do programa
program
  .name("@withgu/ui")
  .description("CLI para gerenciar componentes React")
  .version("1.0.5");

program.parse();
