#!/bin/bash

# Script de setup automático para testar a CLI TypeScript localmente
# Execute: chmod +x setup-test.sh && ./setup-test.sh

set -e  # Para em caso de erro

echo "🚀 Configurando ambiente de teste para MyUI CLI (TypeScript)"
echo ""

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Setup da CLI
echo -e "${BLUE}📦 Passo 1: Configurando a CLI${NC}"
echo "Instalando dependências da CLI..."
npm install

echo "Compilando TypeScript..."
npm run build

echo "Criando link global..."
npm link

echo -e "${GREEN}✓ CLI configurada!${NC}"
echo ""

# 2. Criar projeto de teste
echo -e "${BLUE}📦 Passo 2: Criando projeto de teste${NC}"

# Verificar se já existe
if [ -d "test-project" ]; then
  echo -e "${YELLOW}⚠ Projeto test-project já existe. Removendo...${NC}"
  rm -rf test-project
fi

echo "Criando projeto React + TypeScript com Vite..."
npm create vite@latest test-project -- --template react-ts

cd test-project

echo "Instalando dependências do projeto..."
npm install

echo "Instalando @types/node..."
npm install -D @types/node

echo -e "${GREEN}✓ Projeto criado!${NC}"
echo ""

# 3. Configurar Tailwind
echo -e "${BLUE}📦 Passo 3: Configurando Tailwind CSS${NC}"
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Configurar tailwind.config.js
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
EOF

# Configurar index.css
cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }
}
EOF

echo -e "${GREEN}✓ Tailwind configurado!${NC}"
echo ""

# 4. Configurar Path Aliases
echo -e "${BLUE}📦 Passo 4: Configurando Path Aliases${NC}"

# Atualizar tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF

# Atualizar vite.config.ts
cat > vite.config.ts << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
EOF

echo -e "${GREEN}✓ Path aliases configurados!${NC}"
echo ""

# 5. Inicializar CLI
echo -e "${BLUE}📦 Passo 5: Inicializando MyUI CLI${NC}"

# Criar components.json automaticamente
cat > components.json << 'EOF'
{
  "componentsPath": "src/components/ui",
  "typescript": true,
  "tailwind": true
}
EOF

echo -e "${GREEN}✓ CLI inicializada!${NC}"
echo ""

# 6. Adicionar componentes
echo -e "${BLUE}📦 Passo 6: Adicionando componentes${NC}"
myui add button card input select dialog

echo -e "${GREEN}✓ Componentes adicionados!${NC}"
echo ""

# 7. Criar arquivo de utils
echo -e "${BLUE}📦 Passo 7: Criando utilitários${NC}"
mkdir -p src/lib
cat > src/lib/utils.ts << 'EOF'
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
EOF

echo -e "${GREEN}✓ Utilitários criados!${NC}"
echo ""

# 8. Criar App.tsx de exemplo
echo -e "${BLUE}📦 Passo 8: Criando exemplo de uso${NC}"
cat > src/App.tsx << 'EOF'
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectTrigger, 
  SelectContent, 
  SelectItem, 
  SelectValue 
} from '@/components/ui/select';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold text-gray-800">
            MyUI CLI - TypeScript 🚀
          </h1>
          <p className="text-gray-600 text-lg">
            Componentes React modernos e type-safe
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Componente Button</CardTitle>
            <CardDescription>Todas as variantes e tamanhos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Variantes:</p>
              <div className="flex flex-wrap gap-2">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Tamanhos:</p>
              <div className="flex flex-wrap gap-2 items-center">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">🎨</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Formulário de Exemplo</CardTitle>
            <CardDescription>Input, Select e Dialog</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome completo</label>
              <Input placeholder="Digite seu nome..." />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Categoria</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dev">Desenvolvedor</SelectItem>
                  <SelectItem value="design">Designer</SelectItem>
                  <SelectItem value="pm">Product Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Abrir Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Exemplo de Dialog</DialogTitle>
                    <DialogDescription>
                      Este é um componente Dialog totalmente acessível.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      O Dialog inclui overlay, animações e navegação por teclado.
                    </p>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancelar</Button>
                      <Button>Confirmar</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button>Enviar</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
EOF

echo -e "${GREEN}✓ App.tsx criado!${NC}"
echo ""

# 9. Finalização
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✨ Setup completo!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}Para rodar o projeto:${NC}"
echo ""
echo -e "  ${YELLOW}cd test-project${NC}"
echo -e "  ${YELLOW}npm run dev${NC}"
echo ""
echo -e "${BLUE}Depois acesse:${NC} ${YELLOW}http://localhost:5173${NC}"
echo ""
echo -e "${BLUE}Comandos úteis da CLI:${NC}"
echo -e "  ${YELLOW}myui list${NC}              - Ver componentes disponíveis"
echo -e "  ${YELLOW}myui add <nome>${NC}        - Adicionar componente"
echo -e "  ${YELLOW}myui remove <nome>${NC}     - Remover componente"
echo -e "  ${YELLOW}myui update${NC}            - Atualizar componentes"
echo -e "  ${YELLOW}myui --version${NC}         - Ver versão da CLI"
echo ""
echo -e "${GREEN}Bom teste! 🎉${NC}"
