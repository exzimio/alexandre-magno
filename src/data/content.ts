import type { ImageMetadata } from 'astro';
import docopsTasks from '../assets/docops-tasks.png';
import tenderosDetail from '../assets/tenderos-opportunity-detail.jpg';
import measurexDrawing from '../assets/measurex-drawing.png';
import orbitaStart from '../assets/orbita-start.png';

export type Lang = 'en' | 'pt';

type Text = Record<Lang, string>;

export interface Product {
  name: string;
  /** How the name breaks on the poster; the display face is set very large. */
  titleLines: string[];
  repo: string;
  access: 'public' | 'showcase';
  layout: 'wide' | 'split' | 'flip';
  redTitle: boolean;
  image: ImageMetadata;
  imageAlt: Text;
  tagline: Text;
  deck: Text;
  stack: string;
}

export const products: Product[] = [
  {
    name: 'DocOps',
    titleLines: ['DocOps'],
    repo: 'DocOps',
    access: 'public',
    layout: 'wide',
    redTitle: true,
    image: docopsTasks,
    imageAlt: {
      en: 'DocOps task centre: approvals with assignees, deadlines and status',
      pt: 'Centro de tarefas do DocOps: aprovações com responsáveis, prazos e estado',
    },
    tagline: {
      en: 'Document workflows with tenant isolation enforced in SQL Server.',
      pt: 'Fluxos documentais com o isolamento entre organizações imposto no próprio SQL Server.',
    },
    deck: {
      en: "Invoices, contracts and supplier records go through approvals with deadlines, and every action is audited. Each organisation's data is separated by the application and again by row-level security in the database.",
      pt: 'Faturas, contratos e documentos de fornecedores passam por aprovações com prazos, e cada ação fica auditada. Os dados de cada organização são separados pela aplicação e outra vez pela segurança ao nível da linha na base de dados.',
    },
    stack: '.NET 10 / EF Core / SQL Server / React / TypeScript',
  },
  {
    name: 'TenderOS',
    titleLines: ['Tender', 'OS'],
    repo: 'TenderOS-showcase',
    access: 'showcase',
    layout: 'split',
    redTitle: false,
    image: tenderosDetail,
    imageAlt: {
      en: 'TenderOS opportunity with its relevance score broken down factor by factor',
      pt: 'Oportunidade no TenderOS com a pontuação de relevância decomposta fator a fator',
    },
    tagline: {
      en: 'Scores Portuguese public tenders against a company profile and shows how every point was earned.',
      pt: 'Pontua os concursos públicos portugueses contra o perfil de uma empresa e mostra de onde vem cada ponto.',
    },
    deck: {
      en: 'Collects tenders from the three official sources and merges the copies of each notice into one opportunity. Reads the procurement documents locally, with OCR, and points to the page each requirement came from.',
      pt: 'Recolhe os concursos das três fontes oficiais e junta as cópias de cada anúncio numa só oportunidade. Lê as peças do procedimento localmente, com OCR, e aponta a página de onde vem cada requisito.',
    },
    stack: '.NET 10 / PostgreSQL / Next.js / Tesseract',
  },
  {
    name: 'MeasureX',
    titleLines: ['MeasureX'],
    repo: 'MeasureX-showcase',
    access: 'showcase',
    layout: 'flip',
    redTitle: true,
    image: measurexDrawing,
    imageAlt: {
      en: 'MeasureX measuring areas, lengths and counts on a floor plan',
      pt: 'MeasureX a medir áreas, comprimentos e contagens numa planta',
    },
    tagline: {
      en: 'Quantity takeoff on PDF plans, with quantities linked to the plan and prices frozen per estimate line.',
      pt: 'Medições sobre plantas em PDF, com as quantidades ligadas à planta e os preços fixos em cada linha do orçamento.',
    },
    deck: {
      en: 'Import a plan, set its scale, measure areas, lengths and counts, and turn them into an estimate and a client proposal. A Windows app for small construction firms, offline, in Portuguese and English.',
      pt: 'Importa-se uma planta, define-se a escala, medem-se áreas, comprimentos e contagens, e tudo passa a orçamento e proposta ao cliente. Uma aplicação Windows para pequenas empresas de construção, offline, em português e inglês.',
    },
    stack: '.NET 10 / Avalonia / SQLite',
  },
];

export const orbita = {
  name: 'Órbita',
  image: orbitaStart,
  imageAlt: {
    en: 'Órbita start screen: the rings, the title and the two game modes',
    pt: 'Ecrã inicial do Órbita: os anéis, o título e os dois modos de jogo',
  } satisfies Text,
  tagline: {
    en: 'One-button reflex game built on a single rule: gravity pulls you in, each tap pushes you out.',
    pt: 'Jogo de reflexos de um só botão, com uma regra só: a gravidade puxa para dentro, cada toque empurra para fora.',
  } satisfies Text,
  deck: {
    en: 'Thread the gaps in the rings. Free play, and a daily challenge with the same layout for every player that day.',
    pt: 'Passar pelas aberturas dos anéis. Jogo livre, e um desafio diário com o mesmo percurso para todos os jogadores nesse dia.',
  } satisfies Text,
  stack: 'JavaScript / Canvas 2D / Web Audio',
  page: 'https://exzimio.itch.io/orbita',
  embed: 'https://itch.io/embed-upload/19045274?color=0a0e1f',
};

export const gamesInDevelopment: { name: string; status: Text }[] = [
  { name: 'Recibos Verdes', status: { en: 'Prototype', pt: 'Protótipo' } },
];

export const links = {
  github: 'https://github.com/exzimio',
  linkedin: 'https://www.linkedin.com/in/alexandre-magno-382a813b2/',
  source: 'https://github.com/exzimio/alexandre-magno-site',
};

export const t = {
  en: {
    htmlLang: 'en',
    title: 'Alexandre Magno',
    description:
      'Developer in Portugal. Business software for small companies, and games: DocOps, TenderOS, MeasureX and Órbita.',
    place: 'Portugal',
    profiles: 'Profiles',
    line: 'Developer in Portugal. Business software for small companies, and games.',
    otherLang: { label: 'PT', href: '/pt/', name: 'Português' },
    publicSource: 'Public source',
    showcase: 'Showcase',
    games: 'Games',
    play: 'Play',
    playOnItch: 'Play on itch.io',
    gameFrameTitle: 'Órbita, playable embed from itch.io',
    inDevelopment: 'In development',
    lastCommit: 'Last commit',
    ci: 'DocOps CI',
    passing: 'passing',
    failing: 'failing',
    tests: 'DocOps tests',
    commits90: 'Commits, 90 days',
    readFrom: 'Read from GitHub',
    background: 'Background',
    course: 'Course',
    courseText:
      'Full stack development, CodeMaster, 2026. 300+ hours, live online classes. Final grade 17/20. Recognised by the Portuguese State under Portugal INCoDe.2030.',
    frontEnd: 'Front end',
    backEnd: 'Back end',
    sinceThen: 'Since then',
    sinceThenText:
      'C#/.NET, TypeScript, React, SQL Server, PostgreSQL, learned by building the projects above.',
    builtWith: 'Built with Astro and TypeScript.',
    source: 'Source on GitHub.',
    rights: '© 2026 Alexandre Magno. All rights reserved.',
  },
  pt: {
    htmlLang: 'pt-PT',
    title: 'Alexandre Magno',
    description:
      'Programador em Portugal. Software de gestão para pequenas empresas, e jogos: DocOps, TenderOS, MeasureX e Órbita.',
    place: 'Portugal',
    profiles: 'Perfis',
    line: 'Programador em Portugal. Software de gestão para pequenas empresas, e jogos.',
    otherLang: { label: 'EN', href: '/', name: 'English' },
    publicSource: 'Código público',
    showcase: 'Apresentação',
    games: 'Jogos',
    play: 'Jogar',
    playOnItch: 'Jogar no itch.io',
    gameFrameTitle: 'Órbita, versão jogável do itch.io',
    inDevelopment: 'Em desenvolvimento',
    lastCommit: 'Último commit',
    ci: 'CI do DocOps',
    passing: 'a passar',
    failing: 'a falhar',
    tests: 'Testes do DocOps',
    commits90: 'Commits, 90 dias',
    readFrom: 'Lido do GitHub',
    background: 'Formação',
    course: 'Curso',
    courseText:
      'Desenvolvimento full stack, CodeMaster, 2026. Mais de 300 horas, aulas online em direto. Nota final 17/20. Reconhecido pelo Estado português no âmbito do Portugal INCoDe.2030.',
    frontEnd: 'Front end',
    backEnd: 'Back end',
    sinceThen: 'Depois disso',
    sinceThenText:
      'C#/.NET, TypeScript, React, SQL Server, PostgreSQL, aprendidos a construir os projetos acima.',
    builtWith: 'Feito com Astro e TypeScript.',
    source: 'Código no GitHub.',
    rights: '© 2026 Alexandre Magno. Todos os direitos reservados.',
  },
} as const;

export type Strings = (typeof t)[Lang];
