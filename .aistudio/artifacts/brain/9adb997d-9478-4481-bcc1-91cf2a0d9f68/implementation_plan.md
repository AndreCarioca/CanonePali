# Cânone Pali — Acesso ao Insight (Tipiṭaka Offline em Português)

Aplicação web progressiva (PWA) e ambiente de estudo contemplativo do Cânone Pali em Língua Portuguesa, estruturado nos três grandes cestos (Vinaya, Sutta e Abhidhamma) com base nas traduções canônicas de referência do portal *Acesso ao Insight*. O aplicativo opera 100% offline, oferecendo leitura imersiva, tipografia editorial de alto conforto visual, trilhas guiadas de estudo por tópicos doutrinários e estética minimalista dark em tons de violeta profundo e dourado monástico.

---

### Decisões do Usuário & Parâmetros Confirmados

> [!IMPORTANT]
> As escolhas a seguir foram definidas na fase de alinhamento interativo e direcionam a arquitetura:
> - **Recursos Interativos Prioritários**: Trilhas guiadas por tópicos doutrinários (*Quatro Nobres Verdades*, *Nobre Caminho Óctuplo*, *Origem Dependente / Paṭiccasamuppāda*, *Atenção Plena / Satipaṭṭhāna*, *Conduta Monástica / Vinaya*, e *Psicologia dos Fenômenos / Abhidhamma*) com rastreamento persistente de progresso e reflexões.
> - **Estilo de Experiência de Leitura**: Leitura imersiva editorial com controle tipográfico (tamanho de fonte, entrelinha, largura de coluna, modo tela cheia/foco), notas de rodapé acessíveis, marcadores de versículos e termos em Pali com tradução contextual.
> - **Organização e Navegação**: Guia cronológico estruturado para iniciantes e avançados, conectando a historicidade dos ensinamentos (do Iluminismo e primeiro discurso às instruções monásticas e análises analíticas do Abhidhamma), além da árvore canônica clássica dos 3 Piṭakas.
> - **Acesso 100% Offline**: Todos os textos, notas explicativas, glossário e trilhas são empacotados localmente no cliente com Service Worker / PWA para funcionamento sem internet.

---

## 1. Visão Geral & Conceito do Produto

### O que o aplicativo entrega
Uma biblioteca de estudo e contemplação espiritual e acadêmica do Cânone Budista Theravāda (Tipiṭaka), reunindo:
1. **Vinaya Piṭaka (Cesto da Disciplina)**: As regras fundamentais (Pātimokkha para monges e monjas), a origem das ordenações e a conduta ética do Sangha com comentários práticos de Acesso ao Insight.
2. **Sutta Piṭaka (Cesto dos Discursos)**: Os grandes nikāyas com os ensinamentos fundamentais do Buda Gautama:
   - *Dīgha Nikāya* (Discursos Longos: DN 2 Sāmaññaphala, DN 16 Mahāparinibbāna, DN 22 Mahāsatipaṭṭhāna).
   - *Majjhima Nikāya* (Discursos Médios: MN 10 Satipaṭṭhāna, MN 26 Ariyapariyesana, MN 61 Ambalaṭṭhikā-Rāhulovāda).
   - *Saṃyutta Nikāya* (Discursos Conectados: SN 56.11 Dhammacakkappavattana — A Primeira Roda do Dhamma, SN 22.59 Anattalakkhaṇa — Característica do Não-Eu).
   - *Aṅguttara Nikāya* (Discursos em Grupos Numéricos: AN 3.65 Kālāma Sutta, AN 4.159 Ānanda).
   - *Khuddaka Nikāya* (Textos Breves: Dhammapada completo com versos e capítulos essenciais, Mangala Sutta, Karaniya Metta Sutta, Uraga Sutta do Sutta Nipāta).
3. **Abhidhamma Piṭaka (Cesto dos Ensinamentos Superiores)**: Matriz dos ensinamentos analíticos e fenomenológicos budistas — decomposição dos quatro fatores fundamentais da realidade: Citta (consciência), Cetasika (fatores mentais), Rūpa (matéria) e Nibbāna (incondicionado), com tabelas comparativas e guias de compreensão.

### Público-Alvo
Praticantes de meditação, estudantes budistas e pesquisadores em língua portuguesa que buscam um ambiente limpo, sem distrações e sem depender de conexão de rede para contemplação e estudo no dia a dia.

---

## 2. Experiência do Usuário & Design Visual

### Direção Estética (Dark Minimalista com Violeta & Dourado)
- **Base Neutra (60%)**: Fundo dark profundo e acolhedor inspirado na noite de meditação monástica (`#0B0910`, `#120E1C`, `#171324`).
- **Superfícies Estruturais (30%)**: Cartões de leitura e painéis de navegação com bordas suaves e contraste óptico repousante (`#1C172B`, bordas finas em `#2D2344`).
- **Acentos Iluminados (10%)**: Dourado nobre (`#D4AF37`, `#F5C542`, `#EAB308`) simbolizando a iluminação espiritual, ouro do relicário e sabedoria; violeta místico real (`#8B5CF6`, `#A78BFA`) para destaques e foco contemplativo.
- **Disciplina Anti-Slop**:
  - Nada de pílulas coloridas estáticas ou badges circulares empilhados. Metadados limpos com separadores tipográficos sutis (`·`, `/`).
  - Sem tags mecânicas ou cabeçalhos estilo código. Títulos editoriais claros e sóbrios.
  - Zero contadores falsos ou telemetrias vazias.
  - Tipografia de leitura serifada editorial de alta legibilidade, com proporção áurea de entrelinha e largura de linha balanceada (`max-w-2xl`, 65–75 caracteres).

### Fluxos Principais
1. **Navegação pelos 3 Piṭakas & Guia Cronológico**:
   - Alternância fluida entre a visualização hierárquica canônica (Vinaya, Sutta, Abhidhamma) e o **Guia Cronológico/Níveis** (Para Iniciantes, Praticantes Intermediários e Estudo Profundo).
2. **Leitor Interativo Imersivo**:
   - Painel superior com título canônico e referência original em Pali (ex: *SN 56.11 · Dhammacakkappavattana Sutta*).
   - Barra de utilidades do leitor: ajuste de tamanho de fonte (A- / A+), alternância de margens, modo foco (oculta menus e cabeçalhos para leitura contínua) e marcador de posição.
   - Termos em Pali interativos: ao tocar em termos fundamentais (*dukkha*, *anicca*, *anattā*, *taṇhā*, *nibbāna*, *sati*), um glossário flutuante elegante exibe o significado original e contexto doutrinário.
   - Marcador e notas de reflexão salvas localmente no navegador.
3. **Trilhas Doutrinárias Guiadas**:
   - Módulos temáticos estruturados com suttas selecionados, introdução explicativa pelo Acesso ao Insight, lista de leitura sequencial e indicador de conclusão com persistência em `localStorage`.
4. **Busca Textual Canônica Instantânea**:
   - Pesquisa rápida por título, referência canônica (ex: "DN 22", "Kālāma", "Dhammapada") ou palavra-chave em todo o repositório em memória offline.
5. **Modo PWA Offline**:
   - Botão de instalação no app, detecção automática de estado offline e garantia de que todo o acervo já reside no pacote da aplicação.

---

## 3. Decisões de Produto & Arquitetura de Dados

- **Repositório de Dados Canônicos no Cliente**:
  - Os textos estruturados de *Vinaya*, *Sutta* e *Abhidhamma*, com suas respectivas introduções canônicas, notas de tradutores (como Michael Beisert e Bhikkhu Bodhi em português) e metadados, são organizados em módulos TypeScript tipados.
  - Isso garante tempo de carregamento zero e disponibilidade imediata mesmo em modo avião ou retiros sem internet.
- **Persistência Local**:
  - `localStorage` para histórico de leitura, progresso nas trilhas doutrinárias, marcadores de página e anotações pessoais do estudante.
- **Top Bar Contract**:
  - [Marca / Título de uma linha: "Cânone Pali · Tipiṭaka"] — [4 Links de Navegação: "Trilhas", "Cânone", "Glossário", "Anotações"] — [1 Botão de Ação: "Instalar PWA / Busca"].

---

## 4. Arquitetura Técnica & Diagrama do Sistema

```
┌────────────────────────────────────────────────────────────────────────┐
│                          APLICAÇÃO WEB / PWA                           │
│                     (Vite + React 19 + TypeScript)                     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
    ┌───────────────────────────────┼───────────────────────────────┐
    │                               │                               │
    ▼                               ▼                               ▼
┌───────────────────────┐ ┌───────────────────┐ ┌───────────────────────────┐
│     TOP BAR & NAV     │ │  ESTADO CENTRAL   │ │    REPOSITÓRIO LOCAL      │
│  - Marca Canônica     │ │  - Trilha Ativa   │ │  - Vinaya Piṭaka          │
│  - 3 Piṭakas / Guia   │ │  - Texto Atual    │ │  - Sutta Piṭaka (5 Nikāyas)│
│  - Barra de Ferram.   │ │  - Progresso      │ │  - Abhidhamma Matriz      │
│  - Busca Instantânea  │ │  - Config. Fonte  │ │  - Glossário Pali-PT      │
└───────────┬───────────┘ └─────────┬─────────┘ └─────────────┬─────────────┘
            │                       │                         │
            ▼                       ▼                         ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                           VISÕES PRINCIPAIS                               │
│                                                                           │
│  ┌─────────────────────────┐  ┌────────────────────────────────────────┐  │
│  │ Guia Cronológico &      │  │ Leitor Imersivo Editorial              │  │
│  │ Trilhas Doutrinárias    │  │ - Tipografia Serena (Pali & PT)        │  │
│  │ - 4 Nobres Verdades     │  │ - Glossário Flutuante ao Toque         │  │
│  │ - Nobre Caminho Óctuplo │  │ - Marcadores & Notas de Rodapé         │  │
│  │ - Níveis de Estudo      │  │ - Ajuste de Escala & Modo Foco         │  │
│  └─────────────────────────┘  └────────────────────────────────────────┘  │
│                                                                           │
│  ┌─────────────────────────┐  ┌────────────────────────────────────────┐  │
│  │ Explorador dos 3 Cestos │  │ Caderno do Praticante                  │  │
│  │ - Vinaya (Disciplina)   │  │ - Marcadores Salvos                    │  │
│  │ - Sutta (Discursos)     │  │ - Reflexões Pessoais                   │  │
│  │ - Abhidhamma (Matrizes) │  │ - Estatísticas de Estudo Offline       │  │
│  └─────────────────────────┘  └────────────────────────────────────────┘  │
└───────────────────────────────────┬───────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                         PWA SERVICE WORKER CACHE                          │
│        Cache offline garantido de assets, fontes e catálogo completo      │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Plano de Implementação por Etapas

1. **Configuração de Dependências e PWA**:
   - Instalar e configurar `vite-plugin-pwa` para suporte completo offline e manifesto do aplicativo com ícone budista (Roda do Dhamma estilizada minimalista dourada em fundo violeta).
2. **Estrutura de Dados Canônica (Acesso ao Insight PT-BR)**:
   - Estruturar o banco de dados local com:
     - **Vinaya Piṭaka**: Origem da sangha, código do Pātimokkha resumido e comentado, princípios de conduta ética para leigos e ordenados.
     - **Sutta Piṭaka**: Seleção integral e fiel das obras mais emblemáticas com texto integral em português:
       - *Dhammapada* (capítulos e versos emblemáticos completos em português).
       - *SN 56.11 Dhammacakkappavattana Sutta* (A Primeira Roda do Dhamma).
       - *SN 22.59 Anattalakkhaṇa Sutta* (A Característica do Não-Eu).
       - *MN 10 Satipaṭṭhāna Sutta* (Os Quatro Fundamentos da Atenção Plena).
       - *AN 3.65 Kālāma Sutta* (A Instrução aos Kālāmas sobre livre exame).
       - *Khp 5 / Snp 2.4 Maṅgala Sutta* (As Maiores Bênçãos).
       - *Khp 9 Karaṇīya Mettā Sutta* (O Discurso sobre a Bondade Amorosa).
       - *DN 22 Mahāsatipaṭṭhāna Sutta* e trechos de *DN 16 Mahāparinibbāna*.
     - **Abhidhamma Piṭaka**: A visão geral dos 7 livros, o resumo das 4 realidades últimas (Citta, Cetasika, Rūpa, Nibbāna) e matriz fenomenológica.
     - **Glossário Pali-Português**: Termos essenciais com pronúncia e definições doutrinárias detalhadas.
     - **Trilhas Doutrinárias**: 6 trilhas organizadas pedagogicamente (Iniciante, Quatro Nobres Verdades, Meditação & Sati, Ética & Vinaya, Sabedoria & Não-Eu, Abhidhamma).
3. **Componentes da Interface**:
   - `Header`: Top bar contract de 3 zonas, indicador sutil de estado offline, botão de busca e atalho para o PWA.
   - `ReaderView`: Leitor zen com controle de tipografia, modo foco sem distrações, popover de termos Pali, notas de rodapé e botão de favoritar/anotar.
   - `TrackView`: Módulos de estudo guiado com barras de progresso sutis e listas sequenciais.
   - `PitakaExplorer`: Navegação intuitiva entre Vinaya, Sutta (com subpastas para os 5 Nikāyas) e Abhidhamma, ou modo de exibição Cronológico.
   - `GlossaryModal` & `NotebookView`: Acesso rápido aos termos canônicos e caderno pessoal de anotações.
4. **Verificação & Refinamento**:
   - Teste de build e compilação (`compile_applet`).
   - Verificação das regras de design (contraste, sem pills vazias, responsividade mobile e desktop 1440px).
