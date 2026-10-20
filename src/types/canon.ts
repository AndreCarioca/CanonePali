export type PitakaId = 'vinaya' | 'sutta' | 'abhidhamma';

export type NikayaId = 'digha' | 'majjhima' | 'samyutta' | 'anguttara' | 'khuddaka';

export interface CanonicalText {
  id: string;
  pitaka: PitakaId;
  nikaya?: NikayaId;
  code: string; // e.g. "SN 56.11", "MN 10", "Dhp 1-20", "Vin.Pāt.01"
  paliTitle: string; // e.g. "Dhammacakkappavattana Sutta"
  portugueseTitle: string; // e.g. "A Posta em Movimento da Roda do Dhamma"
  summary: string;
  historicalContext?: string;
  translator?: string; // e.g. "Traduzido por Michael Beisert / Acesso ao Insight"
  difficultyLevel: 'iniciante' | 'intermediario' | 'avancado';
  readTimeMinutes: number;
  tags: string[];
  contentSections: {
    heading?: string;
    paliVerses?: string[];
    paragraphs: string[];
    translatorNotes?: string[];
  }[];
}

export interface GlossaryTerm {
  term: string; // e.g. "Dukkha"
  paliSpelling: string; // "dukkha"
  pronunciation?: string;
  literalMeaning: string; // "estresse, sofrimento, insatisfação, atrito"
  doctrinalDefinition: string;
  relatedSuttas: string[]; // text IDs
}

export interface StudyTrack {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  level: 'iniciante' | 'intermediario' | 'avancado';
  theme: string;
  estimatedHours: number;
  textIds: string[];
  doctrinalQuestions: string[];
}

export interface ChronologicalMilestone {
  periodId: string;
  title: string;
  periodName: string;
  approximateDate: string;
  significance: string;
  keyTeachings: string;
  recommendedTexts: string[];
}

export interface UserBookmark {
  textId: string;
  savedAt: string;
  sectionIndex?: number;
  highlightedText?: string;
}

export interface UserStudyNote {
  id: string;
  textId: string;
  textTitle: string;
  createdAt: string;
  content: string;
}

export interface ReaderSettings {
  fontSize: 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  lineSpacing: 'normal' | 'relaxed' | 'loose';
  columnWidth: 'narrow' | 'normal' | 'wide';
  focusMode: boolean;
  showPaliTerms: boolean;
}
