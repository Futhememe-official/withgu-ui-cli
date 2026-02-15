export interface ComponentConfig {
  name: string;
  description: string;
  files: string[];
  dependencies: string[];
}

export interface Components {
  [key: string]: ComponentConfig;
}

export const COMPONENTS: Components = {
  button: {
    name: "Button",
    description: "Botão customizável com variantes",
    files: ["button.tsx"],
    dependencies: [
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
      "@base-ui/react",
    ],
  },
  input: {
    name: "Input",
    description: "Campo de input estilizado",
    files: ["input.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  card: {
    name: "Card",
    description: "Componente de card com header, content e footer",
    files: ["card.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  dialog: {
    name: "Dialog",
    description: "Modal/Dialog acessível",
    files: ["dialog.tsx"],
    dependencies: ["@radix-ui/react-dialog", "clsx", "tailwind-merge"],
  },
  select: {
    name: "Select",
    description: "Select customizável",
    files: ["select.tsx"],
    dependencies: ["@radix-ui/react-select", "clsx", "tailwind-merge"],
  },
};
