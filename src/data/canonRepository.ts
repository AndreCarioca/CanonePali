import { CanonicalText, GlossaryTerm, StudyTrack, UserBookmark, UserStudyNote, ReaderSettings } from '../types/canon';
import { VINAYA_TEXTS } from './vinaya';
import { SUTTA_TEXTS } from './sutta';
import { ABHIDHAMMA_TEXTS } from './abhidhamma';
import { PALI_GLOSSARY } from './glossary';
import { STUDY_TRACKS } from './tracks';
import { CHRONOLOGICAL_MILESTONES } from './chronology';

export const ALL_CANONICAL_TEXTS: CanonicalText[] = [
  ...VINAYA_TEXTS,
  ...SUTTA_TEXTS,
  ...ABHIDHAMMA_TEXTS,
];

export const CANON_DATA = {
  texts: ALL_CANONICAL_TEXTS,
  glossary: PALI_GLOSSARY,
  tracks: STUDY_TRACKS,
  chronology: CHRONOLOGICAL_MILESTONES,
};

// Helper: Buscar texto por ID
export function getTextById(id: string): CanonicalText | undefined {
  return ALL_CANONICAL_TEXTS.find((t) => t.id === id);
}

// Helper: Buscar termo no glossário
export function getGlossaryTerm(termOrWord: string): GlossaryTerm | undefined {
  const clean = termOrWord.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return PALI_GLOSSARY.find((item) => {
    const itemClean = item.paliSpelling.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const termClean = item.term.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return itemClean.includes(clean) || termClean.includes(clean) || clean.includes(itemClean);
  });
}

// Helper: Busca rápida em todo o repositório
export function searchCanonicalRepository(query: string): CanonicalText[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  return ALL_CANONICAL_TEXTS.filter((t) => {
    return (
      t.code.toLowerCase().includes(q) ||
      t.paliTitle.toLowerCase().includes(q) ||
      t.portugueseTitle.toLowerCase().includes(q) ||
      t.summary.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      t.contentSections.some((sec) =>
        sec.paragraphs.some((p) => p.toLowerCase().includes(q))
      )
    );
  });
}

// Storage helpers
const STORAGE_KEYS = {
  SETTINGS: 'canone_pali_reader_settings',
  BOOKMARKS: 'canone_pali_bookmarks',
  NOTES: 'canone_pali_notes',
  TRACK_PROGRESS: 'canone_pali_completed_texts',
  LAST_READ: 'canone_pali_last_read_id',
};

export const defaultSettings: ReaderSettings = {
  fontSize: 'lg',
  lineSpacing: 'relaxed',
  columnWidth: 'normal',
  focusMode: false,
  showPaliTerms: true,
};

export function loadReaderSettings(): ReaderSettings {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export function saveReaderSettings(settings: ReaderSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings to localStorage', e);
  }
}

export function loadBookmarks(): UserBookmark[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function saveBookmarks(bookmarks: UserBookmark[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  } catch (e) {
    console.error('Failed to save bookmarks', e);
  }
}

export function loadNotes(): UserStudyNote[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTES);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function saveNotes(notes: UserStudyNote[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  } catch (e) {
    console.error('Failed to save notes', e);
  }
}

export function loadCompletedTexts(): string[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.TRACK_PROGRESS);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function toggleTextCompletion(textId: string): string[] {
  const current = loadCompletedTexts();
  const exists = current.includes(textId);
  const updated = exists ? current.filter((id) => id !== textId) : [...current, textId];
  try {
    localStorage.setItem(STORAGE_KEYS.TRACK_PROGRESS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save progress', e);
  }
  return updated;
}

export function getLastReadTextId(): string {
  try {
    return localStorage.getItem(STORAGE_KEYS.LAST_READ) || 'sn-56-11';
  } catch {
    return 'sn-56-11';
  }
}

export function setLastReadTextId(textId: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.LAST_READ, textId);
  } catch (e) {
    console.error('Failed to save last read', e);
  }
}
