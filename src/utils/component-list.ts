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
};
