import { CanonicalText } from '../types/canon';

export const VINAYA_TEXTS: CanonicalText[] = [
  {
    id: 'vin-intro',
    pitaka: 'vinaya',
    code: 'Vinaya · Visão Geral',
    paliTitle: 'Vinaya Piṭaka - Āṇādesanā',
    portugueseTitle: 'O Cesto da Disciplina Monástica e Ética',
    summary: 'A estrutura fundamental da disciplina monástica, seu propósito prático na contenção dos sentidos e a preservação do Sangha como refúgio vivo do Dhamma.',
    difficultyLevel: 'iniciante',
    readTimeMinutes: 7,
    translator: 'Acesso ao Insight · Michael Beisert & Thanissaro Bhikkhu',
    tags: ['Vinaya', 'Ética', 'Sangha', 'Disciplina', 'Sīla'],
    contentSections: [
      {
        heading: 'Origem e Propósito do Vinaya',
        paragraphs: [
          'O Vinaya Piṭaka (o "Cesto da Disciplina") é a seção do Cânone Pali que contém as regras de conduta estabelecidas pelo Buda para a comunidade monástica (o Sangha de bhikkhus e bhikkhunīs), além de instruções para a administração comunitária, conciliação e harmonia interna.',
          'Diferente de um código penal mundano, o Vinaya não foi estabelecido de uma só vez por um decreto dogmático. Durante os primeiros anos após o Despertar do Buda, o Sangha não possuía regras formais fixas, pois os primeiros discípulos eram altamente maduros espiritualmente e dotados de profunda pureza de mente.',
          'À medida que a comunidade monástica cresceu e acolheu pessoas de diversas origens e temperamentos, surgiram comportamentos inadequados que causavam atrito entre os membros ou desconfiança na sociedade leiga. Cada regra do Vinaya foi então promulgada pelo Buda em resposta a um incidente específico (nidāna), detalhando o contexto e as exceções.',
        ],
        translatorNotes: [
          'De acordo com o Mahāvagga, o Buda declarou 10 propósitos essenciais para a promulgação do Vinaya: para o bem-estar do Sangha, para a paz do Sangha, para a contenção dos indivíduos mal-intencionados, para o conforto dos monges bem-intencionados, para a contenção das impurezas no presente, para a prevenção de impurezas no futuro, para inspirar a confiança dos que ainda não têm fé, para aumentar a confiança dos que já têm fé, para a longevidade do verdadeiro Dhamma e para a manutenção da disciplina.',
        ],
      },
      {
        heading: 'As Três Grandes Divisões do Vinaya',
        paragraphs: [
          '1. Suttavibhaṅga: Contém as regras do Pātimokkha para os monges (227 regras) e para as monjas (311 regras), acompanhadas da história da origem de cada uma, a formulação exata da regra e a análise minuciosa de intenção, ação e atenuantes.',
          '2. Khandhaka: Dividido em Mahāvagga (Grande Seção) e Cullavagga (Seção Menor). Regula a admissão e ordenação (Pabbajjā e Upasampadā), o retiro das chuvas (Vassa), a cerimônia dos mantos (Kaṭhina), moradia, alimentação, medicina e procedimentos formais de deliberação comunitária (Saṅghakamma).',
          '3. Parivāra: Um compêndio analítico posterior que organiza as regras em formato de catecismo, resumos de estudo e testes pedagógicos para a formação de novos mestres de disciplina.',
        ],
      },
    ],
  },
  {
    id: 'vin-patimokkha',
    pitaka: 'vinaya',
    code: 'Vin. Suttavibhaṅga · Pātimokkha',
    paliTitle: 'Bhikkhu Pātimokkha Sutta',
    portugueseTitle: 'O Código Fundamental do Pātimokkha: As Regras Monásticas',
    summary: 'A estrutura das 227 regras de disciplina monástica recitadas quinzenalmente na lua nova e na lua cheia (Uposatha), divididas pelas suas classes de infração.',
    difficultyLevel: 'intermediario',
    readTimeMinutes: 10,
    translator: 'Acesso ao Insight · Seleção Canônica',
    tags: ['Pātimokkha', 'Pārājika', 'Monásticos', 'Uposatha'],
    contentSections: [
      {
        heading: 'As Categorias de Infrações (Āpatti)',
        paragraphs: [
          'O Pātimokkha representa o coração prático da vida monástica Theravāda. A cada duas semanas, nos dias de Uposatha, a assembleia dos monges se reúne em cada monastério para recitar o código de cor e verificar a pureza moral mútua.',
          'As 227 regras estão categorizadas em ordem decrescente de gravidade:',
        ],
      },
      {
        heading: '1. Pārājika (4 regras de Derrota Irrevogável)',
        paragraphs: [
          'A violação deliberada de qualquer uma das quatro Pārājikas resulta na expulsão imediata e automática do Sangha, sendo o ofensor comparado a uma árvore decapitada que não pode mais reviver:',
          '• Relação sexual de qualquer natureza (celibato absoluto).',
          '• Roubo ou apropriação indevida de bens alheios de valor considerável.',
          '• Assassinato voluntário ou encorajamento ao suicídio de um ser humano.',
          '• Reivindicação fraudulenta de realizações espirituais superiores (alegação falsa de atingimento de jhānas, visões ou iluminação para ganho próprio).',
        ],
      },
      {
        heading: '2. Saṅghādisesa (13 regras de Suspensão Formal)',
        paragraphs: [
          'Infrações muito graves que exigem a intervenção de uma assembleia completa de pelo menos vinte monges para reabilitação após um período de expiação (mānatta). Tratam de condutas como toques libidinosos, mediação amorosa indevida, calúnias contra outros monges, incitação ao cisma comunitário e recusa teimosa de admoestação ética.',
        ],
      },
      {
        heading: '3. Aniyata (2 casos indeterminados) & 4. Nissaggiya Pācittiya (30 regras)',
        paragraphs: [
          'As 30 regras de Nissaggiya Pācittiya envolvem a posse indevida ou excesso de bens materiais (como posse de mantos sobressalentes além de 10 dias, comércio com dinheiro ou ouro, ou retenção indevida de tigela de esmolas). A regra exige a renúncia prévia do objeto diante de outro monge antes da confissão.',
        ],
      },
      {
        heading: '5. Pācittiya (92 regras de Expiação Simples)',
        paragraphs: [
          'Infrações expiadas mediante confissão direta e sincera perante outro bhikkhu puro. Englobam mentira consciente, insulto, consumo de alimentos sólidos após o meio-dia, cavar o solo, danificar a vegetação, desrespeito a regras de convivência e comportamento inadequado com mulheres sem a presença de testemunhas.',
        ],
      },
      {
        heading: '6. Pāṭidesanīya (4 regras), Sekhiya (75 regras de Etiqueta) e Adhikaraṇa-samatha (7 métodos)',
        paragraphs: [
          'As 75 regras de Sekhiya educam a compostura corporal, elegância e dignidade: caminhar de forma contida nos vilarejos, comer sem ruídos de mastigação ou gula, não pregar o Dhamma a quem não demonstra respeito e manter modéstia impecável. Os 7 métodos de Adhikaraṇa-samatha pacificam disputas legais na comunidade através do consenso, testemunho sob juramento ou voto da maioria.',
        ],
      },
    ],
  },
  {
    id: 'vin-leigos',
    pitaka: 'vinaya',
    code: 'Vinaya Leigo · Pañcasīla',
    paliTitle: 'Gihī Vinaya - Pañca Sīla',
    portugueseTitle: 'O Vinaya do Praticante Leigo: Os Cinco Preceitos Éticos',
    summary: 'Como os princípios da disciplina monástica são adaptados para a vida cotidiana do praticante no mundo laico através da virtude protetora e dos 8 preceitos de Uposatha.',
    difficultyLevel: 'iniciante',
    readTimeMinutes: 6,
    translator: 'Acesso ao Insight · Michael Beisert',
    tags: ['Preceitos', 'Sīla', 'Praticantes Leigos', 'Vida Diária'],
    contentSections: [
      {
        heading: 'Os Cinco Preceitos (Pañcasīla)',
        paragraphs: [
          'O Buda muitas vezes chamou os Cinco Preceitos de "as cinco dádivas sublimes" (mahādāna): ao praticá-los, o praticante concede segurança, ausência de medo e benevolência a todos os seres vivos sem exceção.',
          '1. Pāṇātipātā veramaṇī sikkhāpadaṃ samādiyāmi: Empreendo o treinamento para me abster de tirar a vida de seres sencientes.',
          '2. Adinnādānā veramaṇī sikkhāpadaṃ samādiyāmi: Empreendo o treinamento para me abster de tomar aquilo que não me foi dado (roubo ou apropriação indevida).',
          '3. Kāmesu micchācārā veramaṇī sikkhāpadaṃ samādiyāmi: Empreendo o treinamento para me abster de conduta sexual imprópria e prejudicial.',
          '4. Musāvādā veramaṇī sikkhāpadaṃ samādiyāmi: Empreendo o treinamento para me abster da fala falsa, caluniosa ou enganosa.',
          '5. Surā-meraya-majja-pamādaṭṭhānā veramaṇī sikkhāpadaṃ samādiyāmi: Empreendo o treinamento para me abster de substâncias intoxicantes que levam à perda da clareza e negligência mental.',
        ],
      },
      {
        heading: 'Os Oito Preceitos do Dia de Uposatha (Aṭṭhaṅgasīla)',
        paragraphs: [
          'Em dias de lua nova, cheia e quartos crescentes/minguantes, os praticantes leigos costumam assumir temporariamente os Oito Preceitos para emular o estilo de vida monástico:',
          'Além dos quatro primeiros (com o 3º convertido em celibato absoluto enquanto durar o voto), adicionam-se:',
          '• Abstenção de comer em horários impróprios (sólidos após o meio-dia até o amanhecer seguinte).',
          '• Abstenção de dança, música, cosméticos, perfumes, joias e entretenimentos dispersivos.',
          '• Abstenção de assentos e leitos luxuosos e elevados.',
          'Esse exercício purifica a mente, diminui a identificação sensorial e prepara o estudante para mergulhos profundos na meditação de tranquilidade (samatha) e insight (vipassanā).',
        ],
      },
    ],
  },
];
