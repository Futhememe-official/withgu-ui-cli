# 🧪 Como Testar a CLI TypeScript Localmente

## Pré-requisitos

- Node.js >= 18.0.0
- npm, yarn, pnpm ou bun

## Passo 1: Preparar a CLI

```bash
# Entre na pasta da CLI
cd myui-cli

# Instale as dependências
npm install

# Compile o TypeScript
npm run build

# Verifique se foi gerado o dist/cli.js
ls -la dist/

# Crie um link global
npm link
```

### Verificar se funcionou:
```bash
myui --version
# Deve mostrar: 1.0.0

myui --help
# Deve mostrar os comandos disponíveis
```

## Passo 2: Criar um Projeto React de Teste

```bash
# Saia da pasta da CLI
cd ..

# Crie um projeto React com Vite + TypeScript
npm create vite@latest test-project -- --template react-ts

# Entre no projeto
cd test-project

# Instale as dependências
npm install
```

## Passo 3: Configurar Tailwind CSS

```bash
# Instalar Tailwind
npm install -D tailwindcss postcss autoprefixer

# Inicializar Tailwind
npx tailwindcss init -p
```

### Editar `tailwind.config.js`:
```javascript
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
```

### Editar `src/index.css`:
```css
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
```

## Passo 4: Configurar Path Aliases (TypeScript)

### Editar `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Path Aliases */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Editar `vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

### Instalar types do Node.js:
```bash
npm install -D @types/node
```

## Passo 5: Inicializar a CLI

```bash
# Inicializar configuração
myui init

# Responda as perguntas:
# ✓ Onde você quer instalar os componentes? › src/components/ui
# ✓ Você está usando TypeScript? › Yes
# ✓ Você está usando Tailwind CSS? › Yes
```

Isso criará o arquivo `components.json`:
```json
{
  "componentsPath": "src/components/ui",
  "typescript": true,
  "tailwind": true
}
```

## Passo 6: Adicionar Componentes

```bash
# Ver componentes disponíveis
myui list

# Adicionar componentes específicos
myui add button card input

# Ou adicionar todos
myui add --all

# Ou modo interativo
myui add
```

## Passo 7: Criar Arquivo de Utilitários

Crie `src/lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## Passo 8: Usar os Componentes

Edite `src/App.tsx`:

```tsx
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

        {/* Button Examples */}
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

        {/* Form Example */}
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
                  <SelectItem value="other">Outro</SelectItem>
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
                      Este é um componente Dialog totalmente acessível usando Radix UI.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      O Dialog inclui overlay, animações suaves e é totalmente 
                      acessível com navegação por teclado.
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

        {/* Status Card */}
        <Card>
          <CardHeader>
            <CardTitle>Status da Instalação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Componentes:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✅ Button</li>
                  <li>✅ Card</li>
                  <li>✅ Input</li>
                  <li>✅ Select</li>
                  <li>✅ Dialog</li>
                </ul>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Configuração:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✅ TypeScript</li>
                  <li>✅ Tailwind CSS</li>
                  <li>✅ Path Aliases</li>
                  <li>✅ Radix UI</li>
                  <li>✅ CVA</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
```

## Passo 9: Rodar o Projeto

```bash
npm run dev
```

Abra no navegador: http://localhost:5173

## 🧪 Testando Comandos da CLI

### Listar componentes:
```bash
myui list
```

### Adicionar mais componentes:
```bash
myui add dialog select
```

### Remover componentes:
```bash
myui remove input
```

### Atualizar componentes:
```bash
myui update button
```

## 🔧 Modificando a CLI

Se você fizer mudanças no código TypeScript da CLI:

```bash
# 1. Entre na pasta da CLI
cd ../myui-cli

# 2. Edite src/cli.ts

# 3. Recompile
npm run build

# 4. Teste imediatamente (sem precisar refazer o link)
cd ../test-project
myui list
```

Dica: Use `npm run dev` na CLI para recompilar automaticamente:

```bash
# Em um terminal separado
cd myui-cli
npm run dev
```

## ✅ Checklist de Teste

- [ ] CLI compila sem erros TypeScript
- [ ] `npm link` funciona
- [ ] Comando `myui --version` funciona
- [ ] Comando `myui init` cria components.json
- [ ] Comando `myui list` mostra componentes
- [ ] Comando `myui add button` cria arquivo
- [ ] Dependências são instaladas automaticamente
- [ ] Componentes têm tipos TypeScript corretos
- [ ] Componentes renderizam sem erros
- [ ] Estilos do Tailwind funcionam
- [ ] Path aliases (`@/`) funcionam
- [ ] Hot reload funciona no Vite

## 🐛 Troubleshooting

### Erro: "Cannot find module"
```bash
# Certifique-se de ter compilado
cd myui-cli
npm run build
```

### Erro: "Cannot find '@/components/ui/button'"
```bash
# Verifique o tsconfig.json e vite.config.ts
# Instale @types/node
npm install -D @types/node
```

### Tipos do Radix UI faltando:
```bash
# Instale os types
npm install @radix-ui/react-dialog @radix-ui/react-select
```

### CSS não carregando:
```bash
# Verifique se adicionou as variáveis CSS no index.css
# Verifique se importou index.css no main.tsx
```

## 🎉 Próximos Passos

Agora que está tudo funcionando:
1. Adicione mais componentes
2. Customize os estilos
3. Publique no npm (veja PUBLICACAO.md)
4. Contribua com melhorias
