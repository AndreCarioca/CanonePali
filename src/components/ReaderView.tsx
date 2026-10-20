import React, { useState } from 'react';
import {
  Bookmark,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Share2,
  Sparkles,
  BookOpen,
  Sliders,
  FileEdit,
  X,
  HelpCircle,
} from 'lucide-react';
import { CanonicalText, ReaderSettings, UserStudyNote } from '../types/canon';
import { getGlossaryTerm } from '../data/canonRepository';
import { PALI_GLOSSARY } from '../data/glossary';

interface ReaderViewProps {
  currentText: CanonicalText;
  allTexts: CanonicalText[];
  onSelectText: (text: CanonicalText) => void;
  isBookmarked: boolean;
  onToggleBookmark: (textId: string) => void;
  isCompleted: boolean;
  onToggleCompleted: (textId: string) => void;
  onSaveNote: (textId: string, textTitle: string, content: string) => void;
  existingNotes: UserStudyNote[];
  settings: ReaderSettings;
  onUpdateSettings: (newSettings: Partial<ReaderSettings>) => void;
  onOpenGlossary: (term?: string) => void;
}

export const ReaderView: React.FC<ReaderViewProps> = ({
  currentText,
  allTexts,
  onSelectText,
  isBookmarked,
  onToggleBookmark,
  isCompleted,
  onToggleCompleted,
  onSaveNote,
  existingNotes,
  settings,
  onUpdateSettings,
  onOpenGlossary,
}) => {
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [activeGlossaryTerm, setActiveGlossaryTerm] = useState<string | null>(null);

  // Compute previous and next texts
  const currentIndex = allTexts.findIndex((t) => t.id === currentText.id);
  const prevText = currentIndex > 0 ? allTexts[currentIndex - 1] : null;
  const nextText = currentIndex < allTexts.length - 1 ? allTexts[currentIndex + 1] : null;

  // Typography scale classes
  const fontSizeClasses = {
    sm: 'text-sm sm:text-base leading-relaxed',
    base: 'text-base sm:text-lg leading-relaxed',
    lg: 'text-lg sm:text-xl leading-relaxed',
    xl: 'text-xl sm:text-2xl leading-loose',
    '2xl': 'text-2xl sm:text-3xl leading-loose',
  };

  const lineSpacingClasses = {
    normal: 'leading-normal',
    relaxed: 'leading-relaxed',
    loose: 'leading-loose',
  };

  const columnWidthClasses = {
    narrow: 'max-w-xl',
    normal: 'max-w-2xl',
    wide: 'max-w-3xl',
  };

  const handleSaveNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;
    onSaveNote(currentText.id, currentText.portugueseTitle, noteContent.trim());
    setNoteContent('');
    setShowNoteModal(false);
  };

  // Helper to render text with clickable Pali terms
  const renderParagraphWithPaliTerms = (text: string) => {
    // List of keywords to detect
    const keywords = [
      'dukkha',
      'anicca',
      'anattā',
      'anatta',
      'taṇhā',
      'tanha',
      'nibbāna',
      'nibbana',
      'sati',
      'samādhi',
      'samadhi',
      'paññā',
      'panna',
      'sīla',
      'sila',
      'paṭiccasamuppāda',
      'paticcasamuppada',
      'mettā',
      'metta',
      'citta',
      'cetasika',
      'rūpa',
      'rupa',
      'khandha',
      'arahant',
      'uposatha',
      'pātimokkha',
    ];

    const regex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, idx) => {
      const lower = part.toLowerCase();
      if (keywords.includes(lower)) {
        return (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveGlossaryTerm(part)}
            className="inline-block px-1 py-0.5 mx-0.5 rounded text-[#F5C542] hover:bg-[#322352] hover:text-[#FDE047] border-b border-[#D4AF37]/40 transition text-left cursor-pointer font-serif italic"
            title="Clique para ver o significado canônico em Pali"
          >
            {part}
          </button>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  const termDetail = activeGlossaryTerm ? getGlossaryTerm(activeGlossaryTerm) : null;

  return (
    <div className={`min-h-screen bg-[#0B0910] text-[#E2DCDE] transition-all ${settings.focusMode ? 'py-4' : 'py-8'}`}>
      
      {/* Sticky Reader Utility Bar */}
      <div className="sticky top-16 z-30 mb-8 border-y border-[#201833] bg-[#0E0A17]/90 backdrop-blur-md px-4 py-2.5">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          
          {/* Breadcrumb / Code */}
          <div className="flex items-center gap-2 overflow-hidden text-xs text-[#A89EC0]">
            <span className="font-mono text-[#D4AF37] font-semibold">{currentText.code}</span>
            <span aria-hidden="true" className="text-[#4E3E70]">·</span>
            <span className="truncate text-[#D8D0E8]">{currentText.paliTitle}</span>
            <span aria-hidden="true" className="hidden sm:inline text-[#4E3E70]">·</span>
            <span className="hidden sm:inline text-stone-400 capitalize">{currentText.pitaka} Piṭaka</span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Mark as Completed */}
            <button
              onClick={() => onToggleCompleted(currentText.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md transition ${
                isCompleted
                  ? 'bg-[#1D3B2B] text-[#4ADE80] border border-[#22C55E]/40'
                  : 'bg-[#181126] text-[#A89EC0] hover:text-[#EDE8F5] border border-[#2D2147]'
              }`}
              title={isCompleted ? 'Estudo Concluído' : 'Marcar como Lido'}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span className="hidden md:inline">{isCompleted ? 'Concluído' : 'Concluir'}</span>
            </button>

            {/* Bookmark */}
            <button
              onClick={() => onToggleBookmark(currentText.id)}
              className={`p-2 rounded-md transition border ${
                isBookmarked
                  ? 'bg-[#2E1A4D] text-[#F5C542] border-[#D4AF37]/50'
                  : 'bg-[#181126] text-[#A89EC0] hover:text-[#EDE8F5] border-[#2D2147]'
              }`}
              title={isBookmarked ? 'Remover Marcador' : 'Adicionar aos Marcadores'}
            >
              <Bookmark className="h-3.5 w-3.5" fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>

            {/* Note */}
            <button
              onClick={() => setShowNoteModal(true)}
              className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 rounded-md bg-[#181126] hover:bg-[#251A3D] text-[#A89EC0] hover:text-[#EDE8F5] border border-[#2D2147] text-xs transition"
              title="Anotação de Estudo"
            >
              <FileEdit className="h-3.5 w-3.5 text-[#A78BFA]" />
              <span className="hidden sm:inline">Reflexão</span>
            </button>

            {/* Typography & Layout settings dropdown */}
            <button
              onClick={() => setShowSettingsPanel(!showSettingsPanel)}
              className="p-2 rounded-md bg-[#181126] hover:bg-[#251A3D] text-[#A89EC0] hover:text-[#EDE8F5] border border-[#2D2147] transition"
              title="Ajustes de Leitura"
            >
              <Sliders className="h-3.5 w-3.5 text-[#D4AF37]" />
            </button>

            {/* Zen Focus Mode Toggle */}
            <button
              onClick={() => onUpdateSettings({ focusMode: !settings.focusMode })}
              className={`p-2 rounded-md border transition ${
                settings.focusMode
                  ? 'bg-[#2E1A4D] text-[#F5C542] border-[#D4AF37]'
                  : 'bg-[#181126] text-[#A89EC0] hover:text-[#EDE8F5] border-[#2D2147]'
              }`}
              title={settings.focusMode ? 'Sair do Modo Foco' : 'Entrar no Modo Foco'}
            >
              {settings.focusMode ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Floating Typography Settings Drawer */}
        {showSettingsPanel && (
          <div className="mx-auto mt-3 max-w-xl rounded-xl border border-[#3E2F63] bg-[#140E24] p-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#251C3D] mb-3">
              <span className="font-cinzel text-xs font-semibold text-[#F5C542]">Preferências Tipográficas</span>
              <button
                onClick={() => setShowSettingsPanel(false)}
                className="text-[#8C82A3] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Size */}
              <div>
                <label className="block text-[#9D93B5] mb-1.5 font-medium">Tamanho do Texto</label>
                <div className="flex items-center gap-1 bg-[#1A122E] p-1 rounded border border-[#2D2147]">
                  {(['sm', 'base', 'lg', 'xl'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => onUpdateSettings({ fontSize: size })}
                      className={`flex-1 py-1 rounded text-center font-medium capitalize ${
                        settings.fontSize === size
                          ? 'bg-[#4C3B78] text-[#FDE047]'
                          : 'text-[#8C82A3] hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Spacing */}
              <div>
                <label className="block text-[#9D93B5] mb-1.5 font-medium">Entrelinha</label>
                <div className="flex items-center gap-1 bg-[#1A122E] p-1 rounded border border-[#2D2147]">
                  {(['normal', 'relaxed', 'loose'] as const).map((space) => (
                    <button
                      key={space}
                      onClick={() => onUpdateSettings({ lineSpacing: space })}
                      className={`flex-1 py-1 rounded text-center font-medium capitalize ${
                        settings.lineSpacing === space
                          ? 'bg-[#4C3B78] text-[#FDE047]'
                          : 'text-[#8C82A3] hover:text-white'
                      }`}
                    >
                      {space === 'normal' ? 'Padrão' : space === 'relaxed' ? 'Média' : 'Ampla'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Column Width */}
              <div>
                <label className="block text-[#9D93B5] mb-1.5 font-medium">Largura da Página</label>
                <div className="flex items-center gap-1 bg-[#1A122E] p-1 rounded border border-[#2D2147]">
                  {(['narrow', 'normal', 'wide'] as const).map((w) => (
                    <button
                      key={w}
                      onClick={() => onUpdateSettings({ columnWidth: w })}
                      className={`flex-1 py-1 rounded text-center font-medium capitalize ${
                        settings.columnWidth === w
                          ? 'bg-[#4C3B78] text-[#FDE047]'
                          : 'text-[#8C82A3] hover:text-white'
                      }`}
                    >
                      {w === 'narrow' ? 'Estreita' : w === 'normal' ? 'Clássica' : 'Larga'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Canonical Article Container */}
      <article className={`mx-auto px-4 sm:px-6 ${columnWidthClasses[settings.columnWidth]}`}>
        
        {/* Editorial Header */}
        <header className="mb-10 text-center pb-8 border-b border-[#251A3D]">
          {/* Metadata string without pills */}
          <div className="flex items-center justify-center gap-2 text-xs text-[#A89EC0] font-sans tracking-wide mb-3">
            <span className="font-mono text-[#D4AF37] font-semibold">{currentText.code}</span>
            <span aria-hidden="true">·</span>
            <span className="uppercase tracking-widest text-[#B5ABD1]">{currentText.pitaka} Piṭaka</span>
            <span aria-hidden="true">·</span>
            <span>{currentText.readTimeMinutes} min de leitura</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{currentText.difficultyLevel}</span>
          </div>

          {/* Pali Main Heading */}
          <h1 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-[#F3EDF7] mb-3">
            {currentText.paliTitle}
          </h1>

          {/* Portuguese Translated Subtitle */}
          <h2 className="font-reading text-lg sm:text-xl text-[#F5C542] italic max-w-xl mx-auto leading-relaxed">
            {currentText.portugueseTitle}
          </h2>

          {/* Translator Credit */}
          {currentText.translator && (
            <p className="mt-4 text-xs text-[#7F7499] font-sans">
              Fonte canônica: {currentText.translator}
            </p>
          )}

          {/* Historical Context Callout */}
          {currentText.historicalContext && (
            <div className="mt-6 p-4 rounded-xl border border-[#332652] bg-[#140E24] text-xs text-[#C4B8DC] leading-relaxed text-left">
              <span className="font-semibold text-[#D4AF37] block mb-1">Contexto Histórico:</span>
              {currentText.historicalContext}
            </div>
          )}
        </header>

        {/* Text Sections with Pali Verses and Paragraphs */}
        <div className={`space-y-8 font-reading text-[#D9D1E8] ${fontSizeClasses[settings.fontSize]}`}>
          {currentText.contentSections.map((sec, sIdx) => (
            <section key={sIdx} className="space-y-5">
              {sec.heading && (
                <h3 className="font-cinzel text-lg sm:text-xl font-semibold text-[#F5C542] pt-4 tracking-wide border-b border-[#1E1730] pb-2">
                  {sec.heading}
                </h3>
              )}

              {/* Pali Original Verses (if present) */}
              {sec.paliVerses && sec.paliVerses.length > 0 && (
                <div className="my-5 p-4 rounded-xl border border-[#3E2E66] bg-[#140D26] text-[#E0D7F2] font-serif italic text-sm sm:text-base leading-relaxed space-y-1">
                  <div className="text-[11px] font-sans uppercase tracking-widest text-[#D4AF37] mb-2 font-semibold">
                    Texto em Pali Canônico
                  </div>
                  {sec.paliVerses.map((verse, vIdx) => (
                    <p key={vIdx} className="tracking-wide">
                      {verse}
                    </p>
                  ))}
                </div>
              )}

              {/* Paragraphs in Portuguese with interactive Pali terms */}
              {sec.paragraphs.map((p, pIdx) => {
                // Drop cap for the very first paragraph of the first section
                const isFirst = sIdx === 0 && pIdx === 0;
                return (
                  <p
                    key={pIdx}
                    className={`leading-relaxed tracking-normal ${
                      isFirst
                        ? 'first-letter:text-4xl first-letter:font-cinzel first-letter:font-bold first-letter:text-[#F5C542] first-letter:float-left first-letter:mr-2.5 first-letter:mt-1'
                        : ''
                    }`}
                  >
                    {renderParagraphWithPaliTerms(p)}
                  </p>
                );
              })}

              {/* Translator's Notes */}
              {sec.translatorNotes && sec.translatorNotes.length > 0 && (
                <div className="mt-4 p-3.5 rounded-lg border border-[#2B2042] bg-[#0F0B1A] text-xs text-[#A89CBF] leading-relaxed space-y-1">
                  <span className="font-semibold text-[#D4AF37] block font-sans">Nota de Estudo:</span>
                  {sec.translatorNotes.map((note, nIdx) => (
                    <p key={nIdx}>{note}</p>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Existing Notes for this text */}
        {existingNotes.length > 0 && (
          <div className="mt-12 pt-6 border-t border-[#251A3D]">
            <h4 className="font-cinzel text-sm font-semibold text-[#D4AF37] mb-3 flex items-center gap-2">
              <FileEdit className="h-4 w-4" /> Suas Anotações neste Texto
            </h4>
            <div className="space-y-3">
              {existingNotes.map((note) => (
                <div key={note.id} className="p-3.5 rounded-xl border border-[#372A57] bg-[#140F26] text-xs text-[#D8D0E8] leading-relaxed">
                  <div className="text-[10px] text-[#7E7399] mb-1 font-mono">{new Date(note.createdAt).toLocaleDateString('pt-BR')}</div>
                  <p className="whitespace-pre-wrap">{note.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Previous / Next Sutta Navigation Rail */}
        <nav className="mt-16 pt-8 border-t border-[#231838] flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevText ? (
            <button
              onClick={() => onSelectText(prevText)}
              className="w-full sm:w-auto flex items-center gap-2 px-4 py-3 rounded-xl border border-[#2D2147] bg-[#140F24] hover:bg-[#1E1736] text-left transition group"
            >
              <ChevronLeft className="h-4 w-4 text-[#D4AF37] group-hover:-translate-x-1 transition" />
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-[#7E7399]">Texto Anterior</span>
                <span className="font-cinzel text-xs font-semibold text-[#EDE8F5] group-hover:text-[#F5C542] transition">
                  {prevText.code} · {prevText.paliTitle}
                </span>
              </div>
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nextText ? (
            <button
              onClick={() => onSelectText(nextText)}
              className="w-full sm:w-auto flex items-center justify-end gap-2 px-4 py-3 rounded-xl border border-[#2D2147] bg-[#140F24] hover:bg-[#1E1736] text-right transition group ml-auto"
            >
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-[#7E7399]">Próximo Texto</span>
                <span className="font-cinzel text-xs font-semibold text-[#EDE8F5] group-hover:text-[#F5C542] transition">
                  {nextText.code} · {nextText.paliTitle}
                </span>
              </div>
              <ChevronRight className="h-4 w-4 text-[#D4AF37] group-hover:translate-x-1 transition" />
            </button>
          ) : null}
        </nav>
      </article>

      {/* Floating Glossary Modal when user clicks a Pali Term */}
      {termDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl border border-[#4C3B78] bg-[#150F26] p-6 shadow-2xl text-[#E2DCDE]">
            <div className="flex items-start justify-between gap-4 border-b border-[#281D42] pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block mb-0.5">
                  Glossário Canônico Pali
                </span>
                <h3 className="font-cinzel text-xl font-bold text-[#F5C542]">
                  {termDetail.term}
                </h3>
                {termDetail.pronunciation && (
                  <span className="text-xs text-[#A89EC0] font-sans italic">
                    Pronúncia: [{termDetail.pronunciation}]
                  </span>
                )}
              </div>
              <button
                onClick={() => setActiveGlossaryTerm(null)}
                className="text-[#8C82A3] hover:text-white p-1 rounded-md"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs leading-relaxed">
              <div>
                <strong className="text-[#C4B5FD] block mb-0.5 font-sans">Tradução Literal:</strong>
                <p className="text-[#D8D0E8] italic">{termDetail.literalMeaning}</p>
              </div>

              <div>
                <strong className="text-[#C4B5FD] block mb-0.5 font-sans">Significado Doutrinário (Acesso ao Insight):</strong>
                <p className="text-[#BDB2D6] leading-relaxed">{termDetail.doctrinalDefinition}</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between pt-3 border-t border-[#251A3D]">
              <button
                onClick={() => {
                  const targetTerm = termDetail.term;
                  setActiveGlossaryTerm(null);
                  onOpenGlossary(targetTerm);
                }}
                className="text-xs text-[#D4AF37] hover:underline font-medium"
              >
                Ver todos os termos do glossário →
              </button>

              <button
                onClick={() => setActiveGlossaryTerm(null)}
                className="px-4 py-1.5 rounded-lg bg-[#2D1F4F] hover:bg-[#3D2B69] text-xs font-semibold text-[#F3EDF7] transition"
              >
                Continuar Leitura
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Note Creation Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-[#4C3B78] bg-[#150F26] p-6 shadow-2xl text-[#E2DCDE]">
            <div className="flex items-center justify-between border-b border-[#281D42] pb-3 mb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block">Caderno do Praticante</span>
                <h3 className="font-cinzel text-base font-bold text-[#F3EDF7]">
                  Reflexão em {currentText.code}
                </h3>
              </div>
              <button
                onClick={() => setShowNoteModal(false)}
                className="text-[#8C82A3] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNoteSubmit}>
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Escreva seus pensamentos, correlações com a meditação ou questionamentos sobre este sutta..."
                rows={5}
                required
                className="w-full rounded-xl border border-[#3A2C59] bg-[#0E0A1A] p-3.5 text-xs text-[#E2DCDE] placeholder:text-[#655982] focus:border-[#D4AF37] focus:outline-none transition"
              />

              <div className="mt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowNoteModal(false)}
                  className="px-3.5 py-2 text-xs text-[#A89EC0] hover:text-white transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#3C1E70] hover:bg-[#4E2791] border border-[#7C3AED]/50 text-xs font-semibold text-[#FDE047] transition"
                >
                  Salvar no Caderno
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
