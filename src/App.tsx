/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { ReaderView } from './components/ReaderView';
import { TracksView } from './components/TracksView';
import { PitakaExplorer } from './components/PitakaExplorer';
import { ChronologyView } from './components/ChronologyView';
import { NotebookAndGlossaryView } from './components/NotebookAndGlossaryView';
import { SearchModal } from './components/SearchModal';
import { CanonicalText, ReaderSettings, UserBookmark, UserStudyNote } from './types/canon';
import {
  ALL_CANONICAL_TEXTS,
  CANON_DATA,
  getTextById,
  loadBookmarks,
  saveBookmarks,
  loadNotes,
  saveNotes,
  loadCompletedTexts,
  toggleTextCompletion,
  loadReaderSettings,
  saveReaderSettings,
  getLastReadTextId,
  setLastReadTextId,
} from './data/canonRepository';
import { useOnlineStatus } from './hooks/usePWA';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('tracks');
  const [currentTextId, setCurrentTextId] = useState<string>(() => getLastReadTextId());
  const [bookmarks, setBookmarks] = useState<UserBookmark[]>(() => loadBookmarks());
  const [notes, setNotes] = useState<UserStudyNote[]>(() => loadNotes());
  const [completedTextIds, setCompletedTextIds] = useState<string[]>(() => loadCompletedTexts());
  const [settings, setSettings] = useState<ReaderSettings>(() => loadReaderSettings());
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [targetedGlossaryTerm, setTargetedGlossaryTerm] = useState<string | null>(null);

  const isOnline = useOnlineStatus();

  // Save settings when changed
  const handleUpdateSettings = (newSettings: Partial<ReaderSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    saveReaderSettings(updated);
  };

  // Select text to read
  const handleSelectText = (text: CanonicalText) => {
    setCurrentTextId(text.id);
    setLastReadTextId(text.id);
    setActiveTab('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle bookmark
  const handleToggleBookmark = (textId: string) => {
    const exists = bookmarks.some((b) => b.textId === textId);
    let updated: UserBookmark[];
    if (exists) {
      updated = bookmarks.filter((b) => b.textId !== textId);
    } else {
      updated = [
        ...bookmarks,
        {
          textId,
          savedAt: new Date().toISOString(),
        },
      ];
    }
    setBookmarks(updated);
    saveBookmarks(updated);
  };

  // Toggle text completion
  const handleToggleCompleteText = (textId: string) => {
    const updated = toggleTextCompletion(textId);
    setCompletedTextIds(updated);
  };

  // Save study note
  const handleSaveNote = (textId: string, textTitle: string, content: string) => {
    const newNote: UserStudyNote = {
      id: 'note_' + Date.now(),
      textId,
      textTitle,
      createdAt: new Date().toISOString(),
      content,
    };
    const updated = [newNote, ...notes];
    setNotes(updated);
    saveNotes(updated);
  };

  // Delete note
  const handleDeleteNote = (noteId: string) => {
    const updated = notes.filter((n) => n.id !== noteId);
    setNotes(updated);
    saveNotes(updated);
  };

  // Open glossary with term
  const handleOpenGlossary = (term?: string) => {
    setTargetedGlossaryTerm(term || null);
    setActiveTab('glossary');
  };

  // Global hotkey '/' to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentText = getTextById(currentTextId) || ALL_CANONICAL_TEXTS[0];
  const isCurrentBookmarked = bookmarks.some((b) => b.textId === currentText.id);
  const isCurrentCompleted = completedTextIds.includes(currentText.id);
  const currentNotes = notes.filter((n) => n.textId === currentText.id);

  return (
    <div className="min-h-screen bg-[#0B0910] text-[#E2DCDE] flex flex-col font-sans selection:bg-[#7C3AED]/40 selection:text-[#FDE047]">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        bookmarksCount={bookmarks.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'tracks' && (
          <TracksView
            tracks={CANON_DATA.tracks}
            allTexts={ALL_CANONICAL_TEXTS}
            completedTextIds={completedTextIds}
            onSelectText={handleSelectText}
            onToggleCompleteText={handleToggleCompleteText}
          />
        )}

        {activeTab === 'pitakas' && (
          <PitakaExplorer
            texts={ALL_CANONICAL_TEXTS}
            onSelectText={handleSelectText}
            completedTextIds={completedTextIds}
            bookmarkedTextIds={bookmarks.map((b) => b.textId)}
          />
        )}

        {activeTab === 'chronology' && (
          <ChronologyView
            milestones={CANON_DATA.chronology}
            allTexts={ALL_CANONICAL_TEXTS}
            onSelectText={handleSelectText}
          />
        )}

        {activeTab === 'reader' && (
          <ReaderView
            currentText={currentText}
            allTexts={ALL_CANONICAL_TEXTS}
            onSelectText={handleSelectText}
            isBookmarked={isCurrentBookmarked}
            onToggleBookmark={handleToggleBookmark}
            isCompleted={isCurrentCompleted}
            onToggleCompleted={handleToggleCompleteText}
            onSaveNote={handleSaveNote}
            existingNotes={currentNotes}
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onOpenGlossary={handleOpenGlossary}
          />
        )}

        {activeTab === 'notebook' && (
          <NotebookAndGlossaryView
            initialTab="notebook"
            notes={notes}
            onDeleteNote={handleDeleteNote}
            bookmarks={bookmarks}
            onRemoveBookmark={handleToggleBookmark}
            allTexts={ALL_CANONICAL_TEXTS}
            onSelectText={handleSelectText}
            glossary={CANON_DATA.glossary}
          />
        )}

        {activeTab === 'glossary' && (
          <NotebookAndGlossaryView
            initialTab="glossary"
            notes={notes}
            onDeleteNote={handleDeleteNote}
            bookmarks={bookmarks}
            onRemoveBookmark={handleToggleBookmark}
            allTexts={ALL_CANONICAL_TEXTS}
            onSelectText={handleSelectText}
            glossary={CANON_DATA.glossary}
            initialGlossaryTerm={targetedGlossaryTerm}
          />
        )}
      </main>

      {/* Minimal Monastic Footer */}
      <footer className="border-t border-[#1F1733] bg-[#0A0712] py-8 text-center text-xs text-[#7F7499]">
        <div className="mx-auto max-w-7xl px-4 space-y-2">
          <p className="font-cinzel text-xs text-[#D4AF37] font-semibold tracking-wider">
            CÂNONE PALI (TIPIṬAKA) · EM PORTUGUÊS
          </p>
          <p className="font-reading text-[#A89EC0]">
            Textos canônicos disponibilizados com base no acervo de <em>acessoaoinsight.net</em>.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2 text-[11px] text-[#635780]">
            <span>Vinaya Piṭaka</span>
            <span aria-hidden="true">·</span>
            <span>Sutta Piṭaka</span>
            <span aria-hidden="true">·</span>
            <span>Abhidhamma Piṭaka</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#A78BFA]">100% Offline PWA</span>
          </div>
        </div>
      </footer>

      {/* Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectText={handleSelectText}
      />
    </div>
  );
}
