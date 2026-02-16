import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getLibDirectory(): string {
  return path.join(__dirname, "..", "..", "lib");
}

export async function createUtils(targetPath: string): Promise<void> {
  const libDir = getLibDirectory();
  const utilsLibDir = path.join(libDir, "utils");

  // Debug mode (útil para troubleshooting)
  if (process.env.DEBUG === "true") {
    console.log("\n🔍 Debug Info:");
    console.log("  __filename:", __filename);
    console.log("  __dirname:", __dirname);
    console.log("  libDir:", libDir);
    console.log("  utilsLibDir:", utilsLibDir);
    console.log("  Template exists?:", fs.existsSync(utilsLibDir));

    if (fs.existsSync(libDir)) {
      console.log("  Available utils:", await fs.readdir(libDir));
    }
    console.log();
  }

  // Validar se o diretório de template existe
  if (!fs.existsSync(utilsLibDir)) {
    throw new Error(
      `❌ Template não encontrado: ${utilsLibDir}\n\n` +
        `Certifique-se de que:\n` +
        `1. A pasta 'lib/utils/' existe no projeto da CLI\n` +
        `2. O campo "files" no package.json inclui "templates"\n` +
        `3. Você rodou 'npm run build' antes de publicar\n\n` +
        `Execute com DEBUG=true para mais informações:\n` +
        `DEBUG=true ui-cli add utils`,
    );
  }

  // Criar diretório de destino se não existir
  await fs.ensureDir(targetPath);

  // Ler todos os arquivos do template
  const files = await fs.readdir(utilsLibDir);

  // Copiar cada arquivo
  for (const file of files) {
    // Ignorar arquivos ocultos e node_modules
    if (file.startsWith(".") || file === "node_modules") {
      continue;
    }

    const sourcePath = path.join(utilsLibDir, file);
    const destPath = path.join(targetPath, file);

    // Verificar se é arquivo (não diretório)
    const stat = await fs.stat(sourcePath);
    if (!stat.isFile()) {
      console.log(`  ⊳ Pulando diretório: ${file}`);
      continue;
    }

    try {
      await fs.copy(sourcePath, destPath, { overwrite: true });

      const relativePath = path.relative(process.cwd(), destPath);
      console.log(chalk.green(`  ⊳ Utils criado em: ${relativePath}`));
    } catch (error) {
      console.error(`✗ Erro ao copiar ${file}:`, error);
      throw error;
    }
  }
}
