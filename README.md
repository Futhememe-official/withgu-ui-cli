# MyUI CLI - TypeScript Edition 🚀

Uma CLI moderna para distribuir componentes React, escrita em TypeScript e inspirada no shadcn/ui.

## ✨ Características

- ✅ **100% TypeScript** - Type-safe em toda a aplicação
- 🎨 **Componentes prontos** - Button, Input, Card, Dialog, Select
- 🎯 **Tailwind CSS** - Estilização moderna e responsiva
- 📦 **Gerenciadores flexíveis** - Suporte para npm, yarn, pnpm e bun
- 🔧 **Customizável** - Os componentes ficam no seu projeto
- 🚀 **Fácil de usar** - Interface interativa e intuitiva

## 📦 Instalação

### Como desenvolvedor da CLI:

```bash
# Clone ou crie o projeto
npm install

# Compilar TypeScript
npm run build

# Link local para testar
npm link
```

### Como usuário da CLI:

```bash
# Instalar globalmente (quando publicado)
npm install -g myui-cli

# Ou usar com npx
npx myui-cli init
```

## 🎯 Uso

### 1. Inicializar no seu projeto React

```bash
myui init
```

Isso vai criar um arquivo `components.json` com suas preferências:
```json
{
  "componentsPath": "src/components/ui",
  "typescript": true,
  "tailwind": true
}
```

### 2. Adicionar componentes

Adicionar um componente específico:
```bash
myui add button
```

Adicionar múltiplos componentes:
```bash
myui add button input card
```

Adicionar todos os componentes:
```bash
myui add --all
```

Escolher componentes interativamente:
```bash
myui add
```

### 3. Listar componentes disponíveis

```bash
myui list
```

### 4. Remover componentes

```bash
myui remove button card
```

### 5. Atualizar componentes

```bash
# Atualizar componentes específicos
myui update button input

# Atualizar todos os componentes instalados
myui update
```

## 📚 Componentes Disponíveis

### Button
Botão customizável com múltiplas variantes e tamanhos.

**Variantes:** default, destructive, outline, secondary, ghost, link  
**Tamanhos:** sm, default, lg, icon  
**Dependências:** class-variance-authority, clsx, tailwind-merge

```tsx
import { Button } from '@/components/ui/button';

<Button variant="default">Click me</Button>
<Button variant="outline" size="sm">Small</Button>
```

### Input
Campo de input estilizado e acessível.

**Dependências:** clsx, tailwind-merge

```tsx
import { Input } from '@/components/ui/input';

<Input placeholder="Digite seu email..." type="email" />
```

### Card
Componente de card com header, content e footer.

**Dependências:** clsx, tailwind-merge

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
  </CardHeader>
  <CardContent>
    Conteúdo do card
  </CardContent>
</Card>
```

### Dialog
Modal/Dialog acessível usando Radix UI.

**Dependências:** @radix-ui/react-dialog, clsx, tailwind-merge

```tsx
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';

<Dialog>
  <DialogTrigger>Abrir</DialogTrigger>
  <DialogContent>
    Conteúdo do modal
  </DialogContent>
</Dialog>
```

### Select
Select customizável usando Radix UI.

**Dependências:** @radix-ui/react-select, clsx, tailwind-merge

```tsx
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Selecione..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Opção 1</SelectItem>
    <SelectItem value="2">Opção 2</SelectItem>
  </SelectContent>
</Select>
```

## 🛠️ Estrutura do Projeto

```
myui-cli/
├── src/
│   └── cli.ts           # Código fonte TypeScript
├── dist/                # Código compilado (gerado)
│   └── cli.js
├── templates/           # Templates dos componentes
│   ├── button/
│   │   └── button.tsx
│   ├── input/
│   │   └── input.tsx
│   ├── card/
│   │   └── card.tsx
│   ├── dialog/
│   │   └── dialog.tsx
│   └── select/
│       └── select.tsx
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Configuração do Projeto React

### 1. Criar arquivo de utils

Crie `src/lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 2. Configurar Tailwind CSS

No seu `tailwind.config.js`:

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
      },
    },
  },
  plugins: [],
}
```

### 3. Adicionar variáveis CSS

No seu `src/index.css`:

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
  }
}
```

## 🔧 Scripts de Desenvolvimento

```bash
# Compilar TypeScript
npm run build

# Compilar em modo watch
npm run dev

# Testar localmente
npm link
```

## 📝 Exemplo de Uso Completo

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

function App() {
  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Formulário de Exemplo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Nome completo" />
          
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Opção 1</SelectItem>
              <SelectItem value="2">Opção 2</SelectItem>
            </SelectContent>
          </Select>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>Abrir Modal</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Título do Modal</DialogTitle>
              </DialogHeader>
              <p>Conteúdo do modal aqui</p>
            </DialogContent>
          </Dialog>
          
          <div className="flex gap-2">
            <Button variant="default">Salvar</Button>
            <Button variant="outline">Cancelar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

## 🚀 Melhorias Futuras

- [ ] Adicionar mais componentes
- [ ] Suporte para temas (dark mode)
- [ ] Publicar no npm
- [ ] Sistema de registry online
- [ ] Testes automatizados
- [ ] Documentação interativa
- [ ] Suporte para outros frameworks (Next.js, Remix)

## 📄 Licença

MIT

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se livre para abrir issues ou pull requests.

## 💡 Inspiração

Este projeto foi inspirado pelo excelente [shadcn/ui](https://ui.shadcn.com/).
