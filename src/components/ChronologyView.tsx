import React from 'react';
import { History, BookOpen, Clock, MapPin, ArrowRight } from 'lucide-react';
import { ChronologicalMilestone, CanonicalText } from '../types/canon';

interface ChronologyViewProps {
  milestones: ChronologicalMilestone[];
  allTexts: CanonicalText[];
  onSelectText: (text: CanonicalText) => void;
}

export const ChronologyView: React.FC<ChronologyViewProps> = ({
  milestones,
  allTexts,
  onSelectText,
}) => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 text-[#E2DCDE]">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="flex items-center justify-center gap-2 text-xs text-[#A78BFA] font-serif italic mb-2">
          <History className="h-4 w-4 text-[#D4AF37]" />
          <span>Historicidade e Evolução Doutrinária</span>
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-tight text-[#F3EDF7]">
          Guia Cronológico do Cânone Pali
        </h1>
        <p className="mt-3 text-sm text-[#A89EC0] leading-relaxed">
          Acompanhe os momentos cruciais da dispensação budista: do Despertar em Bodh Gaya à transmissão oral dos primeiros sermões, a partida do Mestre e a sistematização posterior dos Três Cestos nos Concílios.
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative border-l border-[#352554] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
        {milestones.map((milestone, idx) => {
          return (
            <div key={milestone.periodId} className="relative group">
              
              {/* Golden Wheel Node */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-1 flex h-8 w-8 items-center justify-center rounded-full border border-[#D4AF37] bg-[#19112B] text-[#F5C542] shadow-md group-hover:scale-110 transition">
                <span className="font-cinzel text-xs font-bold">{idx + 1}</span>
              </div>

              {/* Milestone Card */}
              <div className="rounded-2xl border border-[#2F214C] bg-[#130E22] p-6 hover:border-[#4B3973] hover:bg-[#161026] transition">
                
                {/* Period & Location header */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#9E93B5] mb-2 font-sans">
                  <div className="flex items-center gap-1.5 text-[#C4B5FD]">
                    <Clock className="h-3.5 w-3.5 text-[#D4AF37]" />
                    <span className="font-medium">{milestone.periodName}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#8C82A3]">
                    <MapPin className="h-3.5 w-3.5 text-[#7C3AED]" />
                    <span>{milestone.approximateDate}</span>
                  </div>
                </div>

                {/* Milestone Title */}
                <h3 className="font-cinzel text-xl font-bold text-[#F3EDF7] group-hover:text-[#F5C542] transition">
                  {milestone.title}
                </h3>

                {/* Significance */}
                <p className="mt-3 text-xs sm:text-sm text-[#A89EC0] leading-relaxed">
                  {milestone.significance}
                </p>

                {/* Key Teachings */}
                <div className="mt-4 p-3.5 rounded-xl border border-[#30214F] bg-[#0E0A1A] text-xs text-[#D8D0E8] leading-relaxed">
                  <strong className="text-[#D4AF37] block mb-1 font-sans">Ensinamentos Centrais Deste Período:</strong>
                  {milestone.keyTeachings}
                </div>

                {/* Recommended Canonical Texts */}
                {milestone.recommendedTexts.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-[#231838]">
                    <span className="text-[11px] font-cinzel uppercase tracking-wider text-[#D4AF37] block mb-2 font-semibold">
                      Textos Canônicos Relacionados:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {milestone.recommendedTexts.map((textId) => {
                        const text = allTexts.find((t) => t.id === textId);
                        if (!text) return null;

                        return (
                          <button
                            key={text.id}
                            onClick={() => onSelectText(text)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#3E2D63] bg-[#1B122E] hover:bg-[#281A45] hover:border-[#D4AF37]/50 text-xs text-[#EDE8F5] transition"
                          >
                            <span className="font-mono text-[#F5C542] font-semibold">{text.code}</span>
                            <span>{text.paliTitle}</span>
                            <ArrowRight className="h-3 w-3 text-[#7C3AED]" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
