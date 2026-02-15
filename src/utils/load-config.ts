import fs from "fs-extra";

export interface ProjectConfig {
  componentsPath: string;
  typescript: boolean;
  tailwind: boolean;
}

export async function loadConfig(): Promise<ProjectConfig> {
  const configPath = "components.json";

  if (fs.existsSync(configPath)) {
    return await fs.readJson(configPath);
  }

  // Configuração padrão
  return {
    componentsPath: "src/components/ui",
    typescript: true,
    tailwind: true,
  };
}
