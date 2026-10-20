import React, { useState } from 'react';
import {
  BookOpen,
  Filter,
  CheckCircle2,
  Bookmark,
  Layers,
  Sparkles,
  ChevronRight,
  Shield,
  Scroll,
  Cpu,
} from 'lucide-react';
import { CanonicalText, PitakaId, NikayaId } from '../types/canon';

interface PitakaExplorerProps {
  texts: CanonicalText[];
  onSelectText: (text: CanonicalText) => void;
  completedTextIds: string[];
  bookmarkedTextIds: string[];
}

export const PitakaExplorer: React.FC<PitakaExplorerProps> = ({
  texts,
  onSelectText,
  completedTextIds,
  bookmarkedTextIds,
}) => {
  const [activePitaka, setActivePitaka] = useState<PitakaId>('sutta');
  const [activeNikaya, setActiveNikaya] = useState<NikayaId | 'all'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'iniciante' | 'intermediario' | 'avancado'>('all');

  const pitakaTexts = texts.filter((t) => t.pitaka === activePitaka);

  const filteredTexts = pitakaTexts.filter((t) => {
    if (activePitaka === 'sutta' && activeNikaya !== 'all') {
      if (t.nikaya !== activeNikaya) return false;
    }
    if (difficultyFilter !== 'all' && t.difficultyLevel !== difficultyFilter) {
      return false;
    }
    return true;
  });

  const pitakaInfo = {
    vinaya: {
      title: 'Vinaya Piṭaka',
      subtitle: 'O Cesto da Disciplina',
      desc: 'Regras de conduta moral do Sangha monástico (Pātimokkha), procedimentos de conciliação comunitária e a ética dos Cinco Preceitos para a vida laica.',
      count: texts.filter((t) => t.pitaka === 'vinaya').length,
      icon: Shield,
    },
    sutta: {
      title: 'Sutta Piṭaka',
      subtitle: 'O Cesto dos Discursos',
      desc: 'Os sermões e diálogos canônicos do Buda e de seus principais discípulos ao longo de 45 anos, organizados em cinco grandes Nikāyas.',
      count: texts.filter((t) => t.pitaka === 'sutta').length,
      icon: Scroll,
    },
    abhidhamma: {
      title: 'Abhidhamma Piṭaka',
      subtitle: 'O Cesto dos Ensinamentos Superiores',
      desc: 'A análise fenomenológica sistemática da realidade última: a decomposição de toda a experiência em 89 consciências, 52 fatores mentais e matéria.',
      count: texts.filter((t) => t.pitaka === 'abhidhamma').length,
      icon: Cpu,
    },
  };

  const currentInfo = pitakaInfo[activePitaka];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-[#E2DCDE]">
      
      {/* 3 Baskets Main Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {(['sutta', 'vinaya', 'abhidhamma'] as PitakaId[]).map((pId) => {
          const info = pitakaInfo[pId];
          const Icon = info.icon;
          const isActive = activePitaka === pId;

          return (
            <button
              key={pId}
              onClick={() => {
                setActivePitaka(pId);
                setActiveNikaya('all');
              }}
              className={`p-5 rounded-2xl border text-left transition relative overflow-hidden group ${
                isActive
                  ? 'border-[#D4AF37] bg-[#1A122C] shadow-xl shadow-[#1A0B36]/60'
                  : 'border-[#261C3D] bg-[#110D1D] hover:bg-[#161026] hover:border-[#3E2E66]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon className={`h-5 w-5 ${isActive ? 'text-[#F5C542]' : 'text-[#8C82A3]'}`} />
                  <span className="font-cinzel text-lg font-bold text-[#F3EDF7]">
                    {info.title}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#D4AF37] bg-[#2A1D47] px-2 py-0.5 rounded border border-[#523B7D]/40">
                  {info.count} textos
                </span>
              </div>

              <div className="text-xs text-[#C4B5FD] font-reading italic mb-2">
                {info.subtitle}
              </div>

              <p className="text-xs text-[#8C82A3] line-clamp-2 leading-relaxed">
                {info.desc}
              </p>

              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7C3AED] via-[#D4AF37] to-[#FDE047]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Sub-Filters: Nikayas (if Sutta) + Difficulty Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-[#2B1F44] bg-[#130E22] mb-8">
        
        {/* Nikāyas segmented controls if Sutta */}
        {activePitaka === 'sutta' ? (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-[#8C82A3] mr-1 hidden sm:inline">Nikāya:</span>
            {[
              { id: 'all', label: 'Todos os 5 Nikāyas' },
              { id: 'samyutta', label: 'Saṃyutta (SN)' },
              { id: 'majjhima', label: 'Majjhima (MN)' },
              { id: 'anguttara', label: 'Aṅguttara (AN)' },
              { id: 'khuddaka', label: 'Khuddaka (Dhp/Khp)' },
              { id: 'digha', label: 'Dīgha (DN)' },
            ].map((n) => (
              <button
                key={n.id}
                onClick={() => setActiveNikaya(n.id as any)}
                className={`px-3 py-1 text-xs rounded-lg transition font-medium ${
                  activeNikaya === n.id
                    ? 'bg-[#3A2260] text-[#FDE047] border border-[#7C3AED]/40'
                    : 'text-[#9E94B3] hover:text-[#EDE8F5] bg-[#1A122C]'
                }`}
              >
                {n.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="text-xs text-[#C4B5FD] font-reading italic">
            {currentInfo.subtitle} · Catálogo Integral de Acesso ao Insight
          </div>
        )}

        {/* Difficulty Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-[#8C82A3] mr-1 hidden sm:inline">Nível:</span>
          {[
            { id: 'all', label: 'Todos' },
            { id: 'iniciante', label: 'Iniciante' },
            { id: 'intermediario', label: 'Intermediário' },
            { id: 'avancado', label: 'Avançado' },
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => setDifficultyFilter(d.id as any)}
              className={`px-2.5 py-1 text-xs rounded-lg transition ${
                difficultyFilter === d.id
                  ? 'bg-[#4C3B78] text-[#FDE047]'
                  : 'text-[#8C82A3] hover:text-white bg-[#1A122C]'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Texts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTexts.map((text) => {
          const isDone = completedTextIds.includes(text.id);
          const isSaved = bookmarkedTextIds.includes(text.id);

          return (
            <div
              key={text.id}
              className="flex flex-col justify-between p-5 rounded-2xl border border-[#2B2044] bg-[#120D20] hover:border-[#4B3973] hover:bg-[#161026] transition group"
            >
              <div>
                {/* Meta row */}
                <div className="flex items-center justify-between gap-2 text-xs text-[#8C82A3] mb-2 font-sans">
                  <span className="font-mono text-[#D4AF37] font-semibold">{text.code}</span>
                  <div className="flex items-center gap-2">
                    {isDone && (
                      <span title="Concluído">
                        <CheckCircle2 className="h-4 w-4 text-[#22C55E]" />
                      </span>
                    )}
                    {isSaved && (
                      <span title="Marcado">
                        <Bookmark className="h-4 w-4 text-[#F5C542]" fill="currentColor" />
                      </span>
                    )}
                    <span className="capitalize">{text.difficultyLevel}</span>
                  </div>
                </div>

                {/* Titles */}
                <h3 className="font-cinzel text-base font-bold text-[#EDE8F5] group-hover:text-[#F5C542] transition">
                  {text.paliTitle}
                </h3>
                <h4 className="font-reading text-xs text-[#C4B5FD] italic mt-0.5">
                  {text.portugueseTitle}
                </h4>

                {/* Summary */}
                <p className="mt-3 text-xs text-[#8C82A3] line-clamp-3 leading-relaxed">
                  {text.summary}
                </p>

                {/* Tags without pills */}
                <div className="mt-4 flex flex-wrap items-center gap-1.5 text-[11px] text-[#71658E]">
                  {text.tags.map((tag, tIdx) => (
                    <span key={tIdx}>
                      #{tag}
                      {tIdx < text.tags.length - 1 && ' '}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-[#221838] flex items-center justify-between">
                <span className="text-[11px] text-[#8C82A3]">
                  {text.readTimeMinutes} min de leitura
                </span>

                <button
                  onClick={() => onSelectText(text)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#271B42] hover:bg-[#392661] border border-[#523C7D]/50 text-xs font-semibold text-[#FDE047] transition group-hover:border-[#D4AF37]/50"
                >
                  <span>Abrir Texto</span>
                  <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTexts.length === 0 && (
        <div className="text-center py-12 text-[#8C82A3] text-sm">
          Nenhum texto canônico encontrado com os filtros selecionados.
        </div>
      )}
    </div>
  );
};
