import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import chalk from "chalk";

// Obter __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Obter o diretório de templates
 *
 * Estrutura esperada:
 * @withgu/ui-cli/
 * ├── dist/
 * │   ├── cli.js
 * │   └── utils/
 * │       └── templates.js  <- Estamos aqui (__dirname)
 * └── templates/            <- Queremos acessar aqui
 *     ├── button/
 *     └── input/
 */
function getTemplatesDirectory(): string {
  return path.join(__dirname, "..", "..", "templates");
}

export async function createComponent(
  componentKey: string,
  targetPath: string,
): Promise<void> {
  const templatesDir = getTemplatesDirectory();
  const componentTemplateDir = path.join(templatesDir, componentKey);

  // Debug mode (útil para troubleshooting)
  if (process.env.DEBUG === "true") {
    console.log("\n🔍 Debug Info:");
    console.log("  __filename:", __filename);
    console.log("  __dirname:", __dirname);
    console.log("  templatesDir:", templatesDir);
    console.log("  componentTemplateDir:", componentTemplateDir);
    console.log("  Template exists?:", fs.existsSync(componentTemplateDir));

    if (fs.existsSync(templatesDir)) {
      console.log("  Available templates:", await fs.readdir(templatesDir));
    }
    console.log();
  }

  // Validar se o diretório de template existe
  if (!fs.existsSync(componentTemplateDir)) {
    throw new Error(
      `❌ Template não encontrado: ${componentTemplateDir}\n\n` +
        `Certifique-se de que:\n` +
        `1. A pasta 'templates/${componentKey}/' existe no projeto da CLI\n` +
        `2. O campo "files" no package.json inclui "templates"\n` +
        `3. Você rodou 'npm run build' antes de publicar\n\n` +
        `Execute com DEBUG=true para mais informações:\n` +
        `DEBUG=true ui-cli add ${componentKey}`,
    );
  }

  // Criar diretório de destino se não existir
  await fs.ensureDir(targetPath);

  // Ler todos os arquivos do template
  const files = await fs.readdir(componentTemplateDir);

  // Copiar cada arquivo
  for (const file of files) {
    // Ignorar arquivos ocultos e node_modules
    if (file.startsWith(".") || file === "node_modules") {
      continue;
    }

    const sourcePath = path.join(componentTemplateDir, file);
    const destPath = path.join(targetPath, file);

    // Verificar se é arquivo (não diretório)
    const stat = await fs.stat(sourcePath);
    if (!stat.isFile()) {
      console.log(`  ⊳ Pulando diretório: ${file}`);
      continue;
    }

    try {
      // Copiar arquivo (sobrescrever se já existir)
      await fs.copy(sourcePath, destPath, { overwrite: true });

      // Mostrar caminho relativo (mais limpo)
      const relativePath = path.relative(process.cwd(), destPath);
      console.log(chalk.green(`✓ Criado: ${relativePath}`));
    } catch (error) {
      console.error(chalk.red(`✗ Erro ao copiar ${file}:`), error);
      throw error;
    }
  }
}

/**
 * Verificar se um template existe
 */
export function templateExists(componentKey: string): boolean {
  const templatesDir = getTemplatesDirectory();
  const componentTemplateDir = path.join(templatesDir, componentKey);
  return fs.existsSync(componentTemplateDir);
}

/**
 * Listar todos os templates disponíveis na pasta templates/
 */
export async function listAvailableTemplates(): Promise<string[]> {
  const templatesDir = getTemplatesDirectory();

  if (!fs.existsSync(templatesDir)) {
    console.warn("⚠️  Diretório de templates não encontrado:", templatesDir);
    return [];
  }

  const items = await fs.readdir(templatesDir);

  const templates: string[] = [];
  for (const item of items) {
    const itemPath = path.join(templatesDir, item);
    const stat = await fs.stat(itemPath);

    if (stat.isDirectory() && !item.startsWith(".")) {
      templates.push(item);
    }
  }

  return templates;
}

/**
 * Obter informações sobre um template específico
 */
export async function getTemplateInfo(componentKey: string): Promise<{
  exists: boolean;
  files: string[];
  path: string;
}> {
  const templatesDir = getTemplatesDirectory();
  const componentTemplateDir = path.join(templatesDir, componentKey);

  if (!fs.existsSync(componentTemplateDir)) {
    return {
      exists: false,
      files: [],
      path: componentTemplateDir,
    };
  }

  const files = await fs.readdir(componentTemplateDir);

  // Filtrar apenas arquivos
  const fileList: string[] = [];
  for (const file of files) {
    const filePath = path.join(componentTemplateDir, file);
    const stat = await fs.stat(filePath);
    if (stat.isFile()) {
      fileList.push(file);
    }
  }

  return {
    exists: true,
    files: fileList,
    path: componentTemplateDir,
  };
}
