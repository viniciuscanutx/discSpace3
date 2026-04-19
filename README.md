# 🪐 DiscSpace

O **DiscSpace** é uma Single Page Application (SPA) desenvolvida para ser um diário abstrato de expressão musical e avaliação de faixas, desenhado com um foco rigoroso em micro-interações, mecânicas espaciais vitrificadas (glassmorphism) e arquitetura nativa com o stack moderno do ecossistema React.

A lógica principal consiste no conceito de "lançar ao espaço" impressões ou *reviews* sobre músicas consumidas, onde cada input do usuário não é apenas salvo numa lista trivial, mas embutido em módulos dinâmicos renderizados via React (com posicionamentos calculados) e amarrados ao redor de um player dinâmico rodando na órbita.

---

## 🛠 Engenharia e Arquitetura

O ambiente descarta dependências mastigadas e foca expressamente nos paradigmas recentes de desenvolvimento frontend:

- **Core Rendering:** Estruturado solidamente em **React 19** atrelado à velocidade de module bundling a frio do **Vite**, contendo o roteamento cliente a cliente orquestrado inteiramente com `react-router-dom` (v7).
- **State Management Estrutural:** O controle unificado de níveis, preferências de XP e fluxos complexos de multifaixas do próprio player de áudio são orquestrados por uma arquitetura enxuta de *Stores* usando **Zustand**.
- **Integração Musical (Remote Endpoint):** O arcabouço de busca utiliza como biblioteca remota de *Discovery* a **iTunes Search API**, resgatando payloads de metadados confiáveis, artes em alta resolução e streams paralelos temporários.
- **Independência Estética (Vanilla CSS):** A arquitetura foi propositalmente desenvolvida isolada de engines baseadas na compilação class-based (como Tailwind UI ou Bootstrap). Toda simulação das gravidades (`keyframes`), vetores SVGs (matematicamente centralizados contra a quebra de *baselines*) e gradientes responsivos são processados via manipulação rígida nativa.
- **Type Validation & Testing:** Cobertura de tipos injetada *end-to-end* provendo safety validation de payloads através do **TypeScript**, validando schemas de integração de APIs de música. Adicionalmente amarrado à suíte do **Vitest** manipulando a DOM virtual sob testes integrativos nativamente instanciados pelo **Testing Library**.

---

## 🚀 Mecânicas

- **Discovery Control:** Barramento de UI consumido via endpoints de requisição à catálogos remotos na web. Converte retornos raw para instâncias de metadados das tracks.
- **Spatial Positioning Engine:** As avaliações geradas não re-renderizam linearmente; instiga-se injeções dinâmicas ancoradas em referências fixas relativas ao *node* raiz. Formam-se instâncias com delays progressivos de animação orbitante ao redor da âncora principal criando interatividade livre de layout shifts. 
- **Custom Player Tracking:** Elementos DOM acionam event listeners comunicando eventos reativos sem a lentidão na refatoração da pipeline do React, convertidos para barras de tempo visuais no footer principal.

---

## ⚙️ Ambiente Local (Rodando o seu próprio espaço)

Para rodar o projeto:

```bash
# Constrói a virtual tree dos nodes nativos
npm install

# Lança a compilação local (geralmente localhost:5173)
npm run dev

# Dispara varredura CI de Testes sem interface
npm run test:run

# Compila o report geral
npm run test:coverage
```

---

## 📝 Considerações Finais

Este projeto é um *side-project* desenvolvido estritamente para propósitos de estudo, aprimoramento e experimentação técnica. O principal objetivo é testar conceitos de engenharia e UI/UX (como interações pesadas de DOM, hooks avançados e customização CSS) construindo algo puramente do zero. 

A exploração e captação do acervo de tracks e álbuns está documentada para consultar a futura **[DiscSpace Sonic API](#)**. Os endpoints oficias (`https://api.discspace.local/v1/search`) ainda encontram-se em desenvolvimento; portanto as *requests* de metadados atuais funcionam sob wrappers que eventualmente assinarão o acesso a este serviço.
