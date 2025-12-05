import { Plus, Trash2, Play, RefreshCw, AlignJustify } from 'lucide-react';
import { useTaskStore } from '../../store/taskStore';
import { useTranslation } from '../../utils/i18n';
import type { AppSettings } from '../../types';

export default function Toolbar() {
    const {
        addTask,
        clearTasks,
        removeSelected,
        generateAll,
        generateSelected,
        selectedIds,
        tasks,
        settings,
        updateSettings
    } = useTaskStore();
    const { t } = useTranslation();

    const hasSelection = selectedIds.size > 0;
    const hasTasks = tasks.some(t => t.prompt.trim());

    return (
        <div className="glass-panel rounded-2xl p-4 flex flex-wrap items-center gap-4 shadow-sm sticky top-0 z-40 backdrop-blur-xl bg-surface/50">
            <div className="flex items-center gap-2">
                <button
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/20 text-sm font-medium text-primary transition-all hover:shadow-md active:scale-95"
                    onClick={addTask}
                >
                    <Plus size={18} />
                    {t('toolbar.add_task')}
                </button>
                <div className="w-px h-8 bg-outline-variant/20 mx-2" />
                <button
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-error/10 text-sm font-medium text-gray-400 hover:text-error disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    onClick={removeSelected}
                    disabled={!hasSelection}
                >
                    <Trash2 size={18} />
                    {t('toolbar.delete_selected')}
                </button>
                <button
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-surface-container-highest text-sm font-medium text-gray-400 hover:text-gray-200 transition-all"
                    onClick={clearTasks}
                >
                    <RefreshCw size={18} />
                    {t('toolbar.clear_all')}
                </button>
            </div>

            <div className="ml-auto flex items-center gap-3">
                {/* Row Height Control */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-container-high border border-outline-variant/20">
                    <AlignJustify size={16} className="text-gray-400" />
                    <select
                        className="bg-transparent border-none text-sm text-gray-200 focus:ring-0 cursor-pointer outline-none [&>option]:bg-surface-container-high [&>option]:text-gray-200"
                        value={settings.rowHeight}
                        onChange={(e) => updateSettings({ rowHeight: e.target.value as AppSettings['rowHeight'] })}
                    >
                        <option value="compact">{t('toolbar.row_height.compact')}</option>
                        <option value="normal">{t('toolbar.row_height.normal')}</option>
                        <option value="relaxed">{t('toolbar.row_height.relaxed')}</option>
                    </select>
                </div>

                {hasSelection ? (
                    <button
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-on font-medium shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/40 active:scale-95 transition-all"
                        onClick={generateSelected}
                    >
                        <Play size={18} fill="currentColor" />
                        {t('toolbar.generate_selected')} ({selectedIds.size})
                    </button>
                ) : (
                    <button
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-on font-medium shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/40 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed active:scale-95 transition-all"
                        onClick={generateAll}
                        disabled={!hasTasks}
                    >
                        <Play size={18} fill="currentColor" />
                        {t('toolbar.generate_batch')}
                    </button>
                )}
            </div>
        </div>
    );
}
