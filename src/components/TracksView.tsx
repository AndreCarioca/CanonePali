import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  Circle,
  Clock,
  BookOpen,
  ArrowRight,
  HelpCircle,
  Flame,
  Award,
} from 'lucide-react';
import { StudyTrack, CanonicalText } from '../types/canon';

interface TracksViewProps {
  tracks: StudyTrack[];
  allTexts: CanonicalText[];
  completedTextIds: string[];
  onSelectText: (text: CanonicalText) => void;
  onToggleCompleteText: (textId: string) => void;
}

export const TracksView: React.FC<TracksViewProps> = ({
  tracks,
  allTexts,
  completedTextIds,
  onSelectText,
  onToggleCompleteText,
}) => {
  const [selectedTrackId, setSelectedTrackId] = useState<string>(tracks[0]?.id || '');
  const [activeLevelFilter, setActiveLevelFilter] = useState<'all' | 'iniciante' | 'intermediario' | 'avancado'>('all');

  const filteredTracks = tracks.filter((t) => {
    if (activeLevelFilter === 'all') return true;
    return t.level === activeLevelFilter;
  });

  const selectedTrack = tracks.find((t) => t.id === selectedTrackId) || tracks[0];

  // Calculate track progress
  const getTrackProgress = (track: StudyTrack) => {
    if (!track.textIds.length) return 0;
    const completedCount = track.textIds.filter((id) => completedTextIds.includes(id)).length;
    return Math.round((completedCount / track.textIds.length) * 100);
  };

  const currentTrackProgress = selectedTrack ? getTrackProgress(selectedTrack) : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-[#E2DCDE]">
      
      {/* Hero Marquee Section */}
      <section className="mb-10 text-center sm:text-left sm:flex items-end justify-between border-b border-[#281C3F] pb-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs text-[#A78BFA] font-serif italic mb-2">
            <Compass className="h-4 w-4 text-[#D4AF37]" />
            <span>Trilhas Pedagógicas Canônicas</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-tight text-[#F3EDF7]">
            Trilhas de Estudo Doutrinário
          </h1>
          <p className="mt-3 text-sm text-[#A89EC0] leading-relaxed font-sans">
            Itinerários temáticos ordenados com base na pedagogia do <em>Acesso ao Insight</em>.
            Explore os ensinamentos fundamentais desde a livre investigação até a psicologia profunda do Abhidhamma.
          </p>
        </div>

        {/* Filter buttons - segmented control */}
        <div className="mt-6 sm:mt-0 flex items-center gap-1 bg-[#150F24] p-1.5 rounded-xl border border-[#2B2044]">
          {(
            [
              { id: 'all', label: 'Todas as Trilhas' },
              { id: 'iniciante', label: 'Iniciantes' },
              { id: 'intermediario', label: 'Intermediário' },
              { id: 'avancado', label: 'Avançado' },
            ] as const
          ).map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveLevelFilter(filter.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
                activeLevelFilter === filter.id
                  ? 'bg-[#3A245C] text-[#FDE047] shadow-sm border border-[#7C3AED]/40'
                  : 'text-[#9E94B3] hover:text-[#EDE8F5]'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      {/* Main 2-column Track Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Track Selector Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-3.5">
          <span className="text-xs uppercase tracking-widest text-[#7E7399] font-sans font-semibold block mb-2">
            Selecione uma Trilha ({filteredTracks.length})
          </span>

          {filteredTracks.map((track) => {
            const isSelected = track.id === selectedTrackId;
            const progress = getTrackProgress(track);
            const isFinished = progress === 100;

            return (
              <button
                key={track.id}
                onClick={() => setSelectedTrackId(track.id)}
                className={`w-full text-left p-4 rounded-xl border transition group ${
                  isSelected
                    ? 'border-[#D4AF37] bg-[#18112C] shadow-lg shadow-[#1C0E38]/50'
                    : 'border-[#261D3D] bg-[#100C1C] hover:bg-[#161026] hover:border-[#3E2E66]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 text-xs text-[#9E94B3] mb-1.5 font-sans">
                  <span className="text-[#C4B5FD] font-medium">{track.theme}</span>
                  <span className="capitalize text-[#82779C]">{track.level} · {track.estimatedHours}h de estudo</span>
                </div>

                <h3 className={`font-cinzel text-base font-semibold transition ${
                  isSelected ? 'text-[#F5C542]' : 'text-[#EDE8F5] group-hover:text-white'
                }`}>
                  {track.title}
                </h3>

                <p className="mt-1 text-xs text-[#8C82A3] line-clamp-2 leading-relaxed">
                  {track.subtitle}
                </p>

                {/* Progress bar */}
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-1.5 flex-1 rounded-full bg-[#201833] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#7C3AED] to-[#D4AF37] rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="font-mono text-[11px] text-[#A89EC0] tabular-nums">
                    {progress}%
                  </span>
                  {isFinished && <Award className="h-3.5 w-3.5 text-[#F5C542]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Track Detail & Canonical Sutta Reading List (7 cols) */}
        {selectedTrack && (
          <div className="lg:col-span-7 rounded-2xl border border-[#332454] bg-[#130E22] p-6 lg:p-8 space-y-6">
            
            {/* Header of selected track */}
            <div>
              <div className="flex items-center justify-between text-xs text-[#A89EC0] font-sans mb-1">
                <span>{selectedTrack.theme}</span>
                <span className="capitalize text-[#D4AF37] font-semibold">{selectedTrack.level}</span>
              </div>
              <h2 className="font-cinzel text-2xl font-bold text-[#F3EDF7]">
                {selectedTrack.title}
              </h2>
              <p className="mt-2 text-sm text-[#C4B5FD] font-reading italic">
                {selectedTrack.subtitle}
              </p>
              <p className="mt-3 text-xs sm:text-sm text-[#A89EC0] leading-relaxed">
                {selectedTrack.description}
              </p>
            </div>

            {/* Sutta Reading List */}
            <div className="pt-4 border-t border-[#251A3D]">
              <div className="flex items-center justify-between mb-4">
                <span className="font-cinzel text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                  Textos Canônicos Recomendados ({selectedTrack.textIds.length})
                </span>
                <span className="text-xs text-[#A89EC0]">
                  {selectedTrack.textIds.filter((id) => completedTextIds.includes(id)).length} de {selectedTrack.textIds.length} concluídos
                </span>
              </div>

              <div className="space-y-3">
                {selectedTrack.textIds.map((textId, idx) => {
                  const text = allTexts.find((t) => t.id === textId);
                  if (!text) return null;
                  const isDone = completedTextIds.includes(text.id);

                  return (
                    <div
                      key={text.id}
                      className={`flex items-start justify-between gap-3 p-4 rounded-xl border transition ${
                        isDone
                          ? 'border-[#22C55E]/30 bg-[#101F18]/40'
                          : 'border-[#2D2147] bg-[#181129] hover:border-[#4B3973]'
                      }`}
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <button
                          type="button"
                          onClick={() => onToggleCompleteText(text.id)}
                          className="mt-0.5 text-[#A89EC0] hover:text-[#4ADE80] transition shrink-0"
                          title={isDone ? 'Desmarcar' : 'Marcar como Lido'}
                        >
                          {isDone ? (
                            <CheckCircle2 className="h-5 w-5 text-[#22C55E]" />
                          ) : (
                            <Circle className="h-5 w-5 text-[#4E3E70]" />
                          )}
                        </button>

                        <div>
                          <div className="flex items-center gap-2 text-[11px] text-[#A89EC0] mb-0.5 font-sans">
                            <span className="font-mono text-[#D4AF37] font-semibold">{text.code}</span>
                            <span aria-hidden="true">·</span>
                            <span>{text.readTimeMinutes} min</span>
                          </div>
                          <h4 className="font-cinzel text-sm font-semibold text-[#EDE8F5]">
                            {text.paliTitle}
                          </h4>
                          <p className="text-xs text-[#C4B8DC] font-reading italic">
                            {text.portugueseTitle}
                          </p>
                          <p className="mt-1 text-xs text-[#7F7499] line-clamp-2 leading-relaxed">
                            {text.summary}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectText(text)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#271B42] hover:bg-[#38265E] border border-[#523C7D]/50 text-xs font-semibold text-[#FDE047] transition shrink-0 self-center"
                      >
                        <BookOpen className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Ler</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Doctrinal Reflection Questions */}
            {selectedTrack.doctrinalQuestions && selectedTrack.doctrinalQuestions.length > 0 && (
              <div className="pt-4 border-t border-[#251A3D]">
                <h4 className="font-cinzel text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <HelpCircle className="h-4 w-4" /> Perguntas para Contemplação & Investigação
                </h4>
                <ul className="space-y-2.5 text-xs text-[#C4B8DC] leading-relaxed list-disc list-inside">
                  {selectedTrack.doctrinalQuestions.map((q, qIdx) => (
                    <li key={qIdx} className="pl-1">
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
