# AquaControl - Sistema de Controle de Água

## 📋 Descrição

Sistema inteligente para monitoramento e controle avançado de consumo de água residencial. Desenvolvido para a feira de ciências, o AquaControl oferece uma interface moderna e responsiva para acompanhar o consumo de água em tempo real.

## ✨ Funcionalidades

### 🏠 **Tela 1 - Visão Geral**
- Dashboard principal com logo personalizado
- Cards informativos: Consumo Total, Economia, Status do Sistema
- Distribuição por cômodo com dados detalhados
- Resumo do dia com métricas importantes

### 📊 **Tela 2 - Monitoramento**
- Fluxo de água em tempo real por cômodo
- Gráfico de consumo semanal animado
- Alertas e notificações do sistema

### ⚙️ **Tela 3 - Configurações**
- Configurações gerais (meta mensal, limite de alerta)
- Configurações por cômodo (monitoramento e alertas)
- Toggles funcionais com feedback visual
- Sistema de salvamento com persistência local
- Mensagens de confirmação

### 📈 **Tela 4 - Consumo por Cômodo**
- Gráfico de pizza animado com Framer Motion
- Dados detalhados por ambiente
- Recomendações de economia
- Legenda interativa

## 📊 Dados dos Cômodos

### Consumo por Cômodo (Quantidade de Litros):
- **Banheiro**: 247 litros (45%)
- **Lavanderia**: 165 litros (30%)
- **Cozinha**: 110 litros (20%)
- **Área Externa**: 28 litros (5%)
**Total**: 550 litros

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **React 18** - Biblioteca para interface de usuário
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Animações e transições
- **Lucide React** - Ícones modernos
- **LocalStorage** - Persistência de dados

## 📱 Responsividade

O projeto é totalmente responsivo e otimizado para:

- **📱 Mobile** (320px+): Navegação por ícones, layout adaptativo
- **📱 Tablet** (768px+): Navegação compacta, grid adaptativo
- **💻 Desktop** (1024px+): Navegação completa, layout otimizado
- **🖥️ Large Desktop** (1280px+): Layout expandido

### Breakpoints Utilizados:
- `sm`: 640px (Mobile grande)
- `md`: 768px (Tablet)
- `lg`: 1024px (Desktop pequeno)
- `xl`: 1280px (Desktop grande)

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Comandos
```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar produção
npm start

# Linting
npm run lint
```

### Acesso
- **Desenvolvimento**: http://localhost:3000
- **Produção**: Após deploy no Vercel

## 📦 Deploy no Vercel

### 1. Preparação
```bash
# Build do projeto
npm run build

# Verificar se não há erros
npm run lint
```

### 2. Deploy
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login no Vercel
vercel login

# Deploy
vercel

# Para produção
vercel --prod
```

### 3. Configurações do Vercel
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

## 🎨 Características da UI

### Design System
- **Cores**: Paleta azul/cyan com gradientes
- **Tipografia**: Inter (Google Fonts)
- **Ícones**: Lucide React
- **Animações**: Framer Motion
- **Logo**: Personalizado com fundo #aac9e6

### Componentes
- Cards com hover effects
- Toggles animados
- Gráficos interativos
- Navegação responsiva
- Feedback visual

## 📱 PWA (Progressive Web App)

O projeto inclui configurações PWA:
- Manifest.json configurado
- Meta tags para mobile
- Ícones adaptativos
- Tema colorido
- Instalação nativa

## 🔧 Configurações

### Funcionalidades Implementadas
- ✅ Sistema de configurações persistente
- ✅ Toggles funcionais por cômodo
- ✅ Inputs com validação
- ✅ Salvamento com feedback visual
- ✅ Responsividade completa
- ✅ Animações suaves
- ✅ PWA ready

### Dados Salvos
- Meta de consumo mensal
- Limite de alerta
- Notificações por email
- Configurações por cômodo
- Monitoramento e alertas

## 📄 Estrutura do Projeto

```
AquaControl/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   ├── logo.PNG
│   └── manifest.json
├── package.json
├── tailwind.config.js
├── next.config.js
├── tsconfig.json
└── README.md
```

## 🎯 Funcionalidades Específicas

### Sistema de Configurações
- **Inputs**: Valores temporários até salvar
- **Toggles**: Verde = ligado, cinza = desligado
- **Persistência**: LocalStorage automático
- **Feedback**: Mensagem de confirmação
- **Recarregamento**: Automático após salvar

### Navegação
- **Desktop**: Menu horizontal completo
- **Tablet**: Menu compacto
- **Mobile**: Menu inferior com ícones

## 📈 Performance

- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **Bundle Size**: Otimizado com Next.js
- **Images**: Otimizadas com next/image
- **Animations**: 60fps com Framer Motion

## 🔒 Segurança

- TypeScript para type safety
- Validação de inputs
- Sanitização de dados
- HTTPS obrigatório em produção

## 📞 Suporte

Para dúvidas ou problemas:
- Verificar console do navegador
- Testar em diferentes dispositivos
- Validar configurações do Vercel

## 📄 Licença

Projeto desenvolvido para feira de ciências - 2025

---

**Desenvolvido com ❤️ para monitoramento inteligente de água**
