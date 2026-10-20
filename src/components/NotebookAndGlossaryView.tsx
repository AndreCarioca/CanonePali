import React, { useState } from 'react';
import {
  Bookmark,
  FileEdit,
  Book,
  Search,
  Trash2,
  ExternalLink,
  BookOpen,
  Award,
  Sparkles,
} from 'lucide-react';
import { CanonicalText, GlossaryTerm, UserBookmark, UserStudyNote } from '../types/canon';

interface NotebookAndGlossaryViewProps {
  initialTab?: 'notebook' | 'glossary';
  notes: UserStudyNote[];
  onDeleteNote: (noteId: string) => void;
  bookmarks: UserBookmark[];
  onRemoveBookmark: (textId: string) => void;
  allTexts: CanonicalText[];
  onSelectText: (text: CanonicalText) => void;
  glossary: GlossaryTerm[];
  initialGlossaryTerm?: string | null;
}

export const NotebookAndGlossaryView: React.FC<NotebookAndGlossaryViewProps> = ({
  initialTab = 'notebook',
  notes,
  onDeleteNote,
  bookmarks,
  onRemoveBookmark,
  allTexts,
  onSelectText,
  glossary,
  initialGlossaryTerm,
}) => {
  const [activeTab, setActiveTab] = useState<'notebook' | 'glossary'>(initialTab);
  const [glossarySearch, setGlossarySearch] = useState(initialGlossaryTerm || '');

  const filteredGlossary = glossary.filter((g) => {
    if (!glossarySearch.trim()) return true;
    const q = glossarySearch.toLowerCase().trim();
    return (
      g.term.toLowerCase().includes(q) ||
      g.paliSpelling.toLowerCase().includes(q) ||
      g.literalMeaning.toLowerCase().includes(q) ||
      g.doctrinalDefinition.toLowerCase().includes(q)
    );
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 text-[#E2DCDE]">
      
      {/* Top segmented tab */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center gap-1 bg-[#140E24] p-1.5 rounded-xl border border-[#2B1F44]">
          <button
            onClick={() => setActiveTab('notebook')}
            className={`flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-lg transition ${
              activeTab === 'notebook'
                ? 'bg-[#3A225F] text-[#FDE047] shadow-sm border border-[#7C3AED]/40'
                : 'text-[#9E94B3] hover:text-[#EDE8F5]'
            }`}
          >
            <Bookmark className="h-4 w-4" />
            <span>Caderno do Praticante</span>
            {bookmarks.length > 0 && (
              <span className="font-mono text-[10px] text-[#D4AF37]">({bookmarks.length})</span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('glossary')}
            className={`flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-lg transition ${
              activeTab === 'glossary'
                ? 'bg-[#3A225F] text-[#FDE047] shadow-sm border border-[#7C3AED]/40'
                : 'text-[#9E94B3] hover:text-[#EDE8F5]'
            }`}
          >
            <Book className="h-4 w-4" />
            <span>Glossário Canônico Pali</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Notebook & Bookmarks */}
      {activeTab === 'notebook' && (
        <div className="space-y-8">
          
          {/* Header */}
          <div className="border-b border-[#241A38] pb-6">
            <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#F3EDF7]">
              Caderno de Estudos & Marcadores
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#A89EC0]">
              Suas reflexões pessoais e trechos salvos para meditação diária. Todos os dados permanecem salvos localmente no seu dispositivo.
            </p>
          </div>

          {/* Bookmarks Section */}
          <section>
            <h2 className="font-cinzel text-base font-semibold text-[#D4AF37] mb-4 flex items-center gap-2">
              <Bookmark className="h-4 w-4" /> Textos Salvos ({bookmarks.length})
            </h2>

            {bookmarks.length === 0 ? (
              <div className="p-8 rounded-2xl border border-dashed border-[#2E224A] text-center text-xs text-[#8C82A3]">
                Você ainda não salvou nenhum texto. Enquanto estiver no leitor, clique no ícone de marcador para guardá-lo aqui.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {bookmarks.map((bm) => {
                  const text = allTexts.find((t) => t.id === bm.textId);
                  if (!text) return null;

                  return (
                    <div
                      key={bm.textId}
                      className="p-4 rounded-xl border border-[#2D2147] bg-[#140F24] flex items-start justify-between gap-3 hover:border-[#4B3973] transition"
                    >
                      <div className="flex-1">
                        <div className="text-[11px] font-mono text-[#D4AF37] font-semibold mb-1">
                          {text.code} · <span className="capitalize text-[#9E93B5] font-sans">{text.pitaka}</span>
                        </div>
                        <h3 className="font-cinzel text-sm font-bold text-[#EDE8F5]">
                          {text.paliTitle}
                        </h3>
                        <p className="text-xs text-[#C4B5FD] font-reading italic">
                          {text.portugueseTitle}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 shrink-0">
                        <button
                          onClick={() => onSelectText(text)}
                          className="p-2 rounded-lg bg-[#271B42] hover:bg-[#38265E] text-[#FDE047] transition"
                          title="Abrir no Leitor"
                        >
                          <BookOpen className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onRemoveBookmark(bm.textId)}
                          className="p-2 rounded-lg bg-[#1D142B] hover:bg-[#3D1424] text-[#A89EC0] hover:text-[#EF4444] transition"
                          title="Remover Marcador"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Notes Section */}
          <section className="pt-6 border-t border-[#241A38]">
            <h2 className="font-cinzel text-base font-semibold text-[#D4AF37] mb-4 flex items-center gap-2">
              <FileEdit className="h-4 w-4" /> Suas Reflexões e Anotações ({notes.length})
            </h2>

            {notes.length === 0 ? (
              <div className="p-8 rounded-2xl border border-dashed border-[#2E224A] text-center text-xs text-[#8C82A3]">
                Nenhuma reflexão registrada ainda. Clique no botão de reflexão no leitor para guardar observações doutrinárias.
              </div>
            ) : (
              <div className="space-y-4">
                {notes.map((note) => {
                  const text = allTexts.find((t) => t.id === note.textId);

                  return (
                    <div
                      key={note.id}
                      className="p-5 rounded-2xl border border-[#2D2147] bg-[#140F24] relative group"
                    >
                      <div className="flex items-center justify-between border-b border-[#241A38] pb-2 mb-3">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-cinzel font-semibold text-[#F5C542]">
                            {note.textTitle}
                          </span>
                          <span className="text-[#655982]">·</span>
                          <span className="text-[#8C82A3] font-mono text-[10px]">
                            {new Date(note.createdAt).toLocaleDateString('pt-BR')}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {text && (
                            <button
                              onClick={() => onSelectText(text)}
                              className="text-xs text-[#A78BFA] hover:text-white flex items-center gap-1 font-medium"
                            >
                              <span>Ir ao Sutta</span>
                              <ExternalLink className="h-3 w-3" />
                            </button>
                          )}
                          <button
                            onClick={() => onDeleteNote(note.id)}
                            className="text-[#8C82A3] hover:text-[#EF4444] transition p-1"
                            title="Excluir Anotação"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-[#D8D0E8] leading-relaxed whitespace-pre-wrap font-reading">
                        {note.content}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      )}

      {/* Tab 2: Pali Glossary */}
      {activeTab === 'glossary' && (
        <div className="space-y-6">
          <div className="border-b border-[#241A38] pb-6">
            <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#F3EDF7]">
              Glossário Canônico Pali
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#A89EC0]">
              Terminologia doutrinária essencial com etimologia, significado literal e contextualização canônica com base no portal <em>Acesso ao Insight</em>.
            </p>

            {/* Search Input */}
            <div className="relative mt-4 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#D4AF37]" />
              <input
                type="text"
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                placeholder="Buscar termo (ex: Dukkha, Anicca, Sati, Nibbāna)..."
                className="w-full rounded-xl border border-[#3A2D5C] bg-[#120D20] pl-10 pr-4 py-2.5 text-xs text-[#EDE8F5] placeholder:text-[#655982] focus:border-[#D4AF37] focus:outline-none transition"
              />
            </div>
          </div>

          {/* Terms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGlossary.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-[#2B2044] bg-[#130E22] hover:border-[#4B3973] transition space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-cinzel text-lg font-bold text-[#F5C542]">
                      {item.term}
                    </h3>
                    <div className="text-[11px] text-[#A89EC0] font-reading italic">
                      Pali: <em>{item.paliSpelling}</em>
                      {item.pronunciation && ` · Pronúncia: [${item.pronunciation}]`}
                    </div>
                  </div>
                </div>

                <div className="text-xs">
                  <span className="text-[#C4B5FD] font-semibold font-sans block mb-0.5">Tradução Literal:</span>
                  <span className="text-[#D8D0E8] italic font-reading">{item.literalMeaning}</span>
                </div>

                <div className="text-xs">
                  <span className="text-[#C4B5FD] font-semibold font-sans block mb-0.5">Definição Doutrinária:</span>
                  <p className="text-[#A89EC0] leading-relaxed">{item.doctrinalDefinition}</p>
                </div>

                {item.relatedSuttas && item.relatedSuttas.length > 0 && (
                  <div className="pt-2 border-t border-[#221838] flex flex-wrap items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#655982]">Suttas:</span>
                    {item.relatedSuttas.map((sId) => {
                      const text = allTexts.find((t) => t.id === sId);
                      if (!text) return null;

                      return (
                        <button
                          key={sId}
                          onClick={() => onSelectText(text)}
                          className="text-[11px] font-mono text-[#D4AF37] hover:underline"
                        >
                          {text.code}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
