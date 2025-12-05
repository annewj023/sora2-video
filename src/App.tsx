import { useState } from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import TaskTable from './components/TaskTable/TaskTable';
import SettingsModal from './components/Toolbar/SettingsModal';
import { Settings } from 'lucide-react';
import { useTranslation } from './utils/i18n';
import './index.css';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-screen bg-surface text-gray-200 overflow-hidden font-sans selection:bg-primary-container selection:text-primary-on-container">
      {/* Fixed Header */}
      <header className="flex-none h-16 px-6 flex items-center justify-between bg-surface-container-low/80 backdrop-blur-md border-b border-white/5 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center">
            <span className="text-3xl">🎬</span>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-gray-100">{t('app.title')}</h1>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-medium tracking-wider text-primary uppercase bg-primary/10 px-1.5 py-0.5 rounded">{t('app.batch')}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container border border-white/5">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>
            <span className="text-xs font-medium text-white/70">{t('app.system_online')}</span>
          </div>

          <button
            onClick={() => setShowSettings(true)}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Scrollable Main Content */}
      {/* Main Content Area - Fixed Toolbar, Scrollable Table Body */}
      <main className="flex-1 flex flex-col min-h-0 bg-surface">
        <div className="flex-none p-6 pb-0 z-40">
          <Toolbar />
        </div>
        <div className="flex-1 p-6 pt-4 min-h-0 overflow-hidden flex flex-col">
          <TaskTable />
        </div>
      </main>

      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
}

export default App;
