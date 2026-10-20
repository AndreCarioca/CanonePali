import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, ChevronRight } from 'lucide-react';
import { CanonicalText } from '../types/canon';
import { searchCanonicalRepository } from '../data/canonRepository';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectText: (text: CanonicalText) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectText,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CanonicalText[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const found = searchCanonicalRepository(query);
    setResults(found);
  }, [query]);

  // Keyboard escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.key === '/' || (e.metaKey && e.key === 'k')) && !isOpen) {
        // can be triggered externally
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl rounded-2xl border border-[#4C3B78] bg-[#140E24] shadow-2xl overflow-hidden text-[#E2DCDE]">
        
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-[#281D42] px-4 py-3 bg-[#171029]">
          <Search className="h-5 w-5 text-[#D4AF37] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar por sutta (ex: SN 56.11, Kālāma, Dhammapada, Satipaṭṭhāna, Vinaya)..."
            autoFocus
            className="w-full bg-transparent pl-3 pr-8 text-sm text-[#EDE8F5] placeholder:text-[#655982] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-[#8C82A3] hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {!query.trim() ? (
            <div className="py-8 text-center text-xs text-[#8C82A3] space-y-2">
              <p>Digite termos em Português ou em Pali para pesquisar no acervo canônico offline.</p>
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
                <span className="text-[#655982]">Sugestões:</span>
                {['Quatro Nobres Verdades', 'Não-Eu', 'Satipaṭṭhāna', 'Kālāma', 'Dhammapada', 'Pātimokkha', 'Cetasika'].map((sug) => (
                  <button
                    key={sug}
                    onClick={() => setQuery(sug)}
                    className="text-[11px] px-2 py-0.5 rounded bg-[#1F1733] text-[#C4B5FD] hover:text-[#F5C542] border border-[#352554] transition"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#8C82A3]">
              Nenhum texto encontrado para "<span className="text-[#EDE8F5]">{query}</span>".
            </div>
          ) : (
            results.map((text) => (
              <button
                key={text.id}
                onClick={() => {
                  onSelectText(text);
                  onClose();
                }}
                className="w-full p-3.5 rounded-xl border border-[#2D2147] bg-[#171129] hover:bg-[#231A3D] hover:border-[#D4AF37]/50 text-left transition flex items-center justify-between gap-3 group"
              >
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center gap-2 text-[11px] text-[#A89EC0] mb-0.5 font-sans">
                    <span className="font-mono text-[#D4AF37] font-semibold">{text.code}</span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize">{text.pitaka} Piṭaka</span>
                    <span aria-hidden="true">·</span>
                    <span>{text.readTimeMinutes} min</span>
                  </div>
                  <h4 className="font-cinzel text-sm font-bold text-[#EDE8F5] group-hover:text-[#F5C542] transition truncate">
                    {text.paliTitle}
                  </h4>
                  <p className="text-xs text-[#C4B8DC] font-reading italic truncate">
                    {text.portugueseTitle}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-[#7C3AED] group-hover:translate-x-1 group-hover:text-[#D4AF37] transition shrink-0" />
              </button>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="border-t border-[#231838] px-4 py-2.5 bg-[#0F0A1C] text-[11px] text-[#71658E] flex items-center justify-between">
          <span>{results.length > 0 ? `${results.length} texto(s) correspondente(s)` : 'Acervo 100% offline'}</span>
          <span>Pressione ESC para fechar</span>
        </div>
      </div>
    </div>
  );
};
