import React from 'react';
import { Search, Bookmark, Download, Sparkles } from 'lucide-react';
import { usePWAInstall, useOnlineStatus } from '../hooks/usePWA';

export type NavTab = 'tracks' | 'pitakas' | 'chronology' | 'reader' | 'notebook' | 'glossary';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenSearch: () => void;
  bookmarksCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  bookmarksCount,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const isOnline = useOnlineStatus();
  const [showIOSModal, setShowIOSModal] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#241B38] bg-[#0B0910]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('tracks')}
          className="group flex items-center gap-3 text-left transition"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D4AF37]/40 bg-[#1A122E] shadow-sm transition group-hover:border-[#D4AF37]">
            <img src="/dhammacakka.svg" alt="Dhammacakka" className="h-6 w-6" />
          </div>
          <div>
            <span className="font-cinzel text-base sm:text-lg font-bold tracking-wide text-[#F3EDF7] group-hover:text-[#F5C542] transition whitespace-nowrap">
              Cânone Pali
            </span>
            <span className="hidden sm:inline-block text-[11px] text-[#A78BFA] ml-2 font-serif italic tracking-wider">
              Tipiṭaka · Acesso ao Insight
            </span>
          </div>
        </button>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <button
            onClick={() => setActiveTab('tracks')}
            className={`whitespace-nowrap transition-colors pb-1 border-b-2 ${
              activeTab === 'tracks'
                ? 'border-[#D4AF37] text-[#F5C542] font-semibold'
                : 'border-transparent text-[#9E94B3] hover:text-[#EDE8F5]'
            }`}
          >
            Trilhas de Estudo
          </button>

          <button
            onClick={() => setActiveTab('pitakas')}
            className={`whitespace-nowrap transition-colors pb-1 border-b-2 ${
              activeTab === 'pitakas'
                ? 'border-[#D4AF37] text-[#F5C542] font-semibold'
                : 'border-transparent text-[#9E94B3] hover:text-[#EDE8F5]'
            }`}
          >
            Os 3 Cestos (Piṭakas)
          </button>

          <button
            onClick={() => setActiveTab('chronology')}
            className={`whitespace-nowrap transition-colors pb-1 border-b-2 ${
              activeTab === 'chronology'
                ? 'border-[#D4AF37] text-[#F5C542] font-semibold'
                : 'border-transparent text-[#9E94B3] hover:text-[#EDE8F5]'
            }`}
          >
            Guia Cronológico
          </button>

          <button
            onClick={() => setActiveTab('reader')}
            className={`whitespace-nowrap transition-colors pb-1 border-b-2 ${
              activeTab === 'reader'
                ? 'border-[#D4AF37] text-[#F5C542] font-semibold'
                : 'border-transparent text-[#9E94B3] hover:text-[#EDE8F5]'
            }`}
          >
            Leitor Imersivo
          </button>

          <button
            onClick={() => setActiveTab('notebook')}
            className={`flex items-center gap-1.5 whitespace-nowrap transition-colors pb-1 border-b-2 ${
              activeTab === 'notebook'
                ? 'border-[#D4AF37] text-[#F5C542] font-semibold'
                : 'border-transparent text-[#9E94B3] hover:text-[#EDE8F5]'
            }`}
          >
            <Bookmark className="h-3.5 w-3.5" />
            <span>Caderno</span>
            {bookmarksCount > 0 && (
              <span className="text-xs text-[#D4AF37] font-mono">({bookmarksCount})</span>
            )}
          </button>
        </nav>

        {/* Zone 3: 1 primary action & utility triggers */}
        <div className="flex items-center gap-2.5 shrink-0">
          {!isOnline && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#D4AF37] bg-[#231A35] px-2.5 py-1 rounded border border-[#D4AF37]/30">
              Modo Offline Ativo
            </span>
          )}

          {isInstallable && !isInstalled && (
            <button
              onClick={install}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#FDE047] bg-[#2C194D] hover:bg-[#3B2266] border border-[#7C3AED]/50 rounded-lg transition"
              title="Instalar App no Dispositivo"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">Instalar Offline</span>
            </button>
          )}

          {isIOS && !isInstalled && (
            <button
              onClick={() => setShowIOSModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#C4B5FD] bg-[#23173B] hover:bg-[#2F1F50] border border-[#7C3AED]/40 rounded-lg transition"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">PWA iOS</span>
            </button>
          )}

          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#E2DCDE] bg-[#1B142C] hover:bg-[#251B3D] border border-[#3A2D5C] rounded-lg transition"
          >
            <Search className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span className="hidden sm:inline">Pesquisar Cânone</span>
            <kbd className="hidden md:inline-block text-[10px] text-[#8C82A3] border border-[#3A2D5C] px-1 rounded bg-[#120D20]">
              /
            </kbd>
          </button>
        </div>
      </div>

      {/* Mobile navigation tab bar */}
      <div className="flex md:hidden overflow-x-auto border-t border-[#1F1733] bg-[#0E0A17] px-3 py-2 gap-4 scrollbar-none text-xs">
        <button
          onClick={() => setActiveTab('tracks')}
          className={`whitespace-nowrap py-1 ${activeTab === 'tracks' ? 'text-[#F5C542] font-semibold' : 'text-[#8C82A3]'}`}
        >
          Trilhas
        </button>
        <button
          onClick={() => setActiveTab('pitakas')}
          className={`whitespace-nowrap py-1 ${activeTab === 'pitakas' ? 'text-[#F5C542] font-semibold' : 'text-[#8C82A3]'}`}
        >
          3 Piṭakas
        </button>
        <button
          onClick={() => setActiveTab('chronology')}
          className={`whitespace-nowrap py-1 ${activeTab === 'chronology' ? 'text-[#F5C542] font-semibold' : 'text-[#8C82A3]'}`}
        >
          Cronologia
        </button>
        <button
          onClick={() => setActiveTab('reader')}
          className={`whitespace-nowrap py-1 ${activeTab === 'reader' ? 'text-[#F5C542] font-semibold' : 'text-[#8C82A3]'}`}
        >
          Leitor
        </button>
        <button
          onClick={() => setActiveTab('notebook')}
          className={`whitespace-nowrap py-1 ${activeTab === 'notebook' ? 'text-[#F5C542] font-semibold' : 'text-[#8C82A3]'}`}
        >
          Caderno ({bookmarksCount})
        </button>
      </div>

      {/* iOS Safari PWA Instruction Guide */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl border border-[#4C3B78] bg-[#161026] p-6 shadow-2xl text-[#E2DCDE]">
            <h3 className="font-cinzel text-lg font-bold text-[#F5C542]">Instalar no iPhone / iPad</h3>
            <p className="mt-3 text-sm text-[#A89EC0] leading-relaxed">
              Para usar o Cânone Pali offline em tela cheia no iOS:
            </p>
            <ol className="mt-3 space-y-2 text-xs text-[#D8D0E8] list-decimal list-inside">
              <li>Toque no botão de <strong>Compartilhar</strong> (ícone com seta para cima) na barra do Safari.</li>
              <li>Role para baixo e toque em <strong>"Adicionar à Tela de Início"</strong>.</li>
              <li>Abra pelo ícone dourado para navegar 100% sem internet.</li>
            </ol>
            <button
              onClick={() => setShowIOSModal(false)}
              className="mt-5 w-full rounded-lg bg-[#2E1F52] hover:bg-[#3D296D] border border-[#7C3AED]/40 py-2 text-xs font-semibold text-[#EDE8F5] transition"
            >
              Compreendi
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
