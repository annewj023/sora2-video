import { Play, Loader2 } from 'lucide-react';
import type { Task, VideoDuration, VideoAspect } from '../../types';
import { useTaskStore } from '../../store/taskStore';
import { useTranslation } from '../../utils/i18n';

interface ActionCellProps {
    task: Task;
}

export default function ActionCell({ task }: ActionCellProps) {
    const { updateTask, generateTask } = useTaskStore();
    const { t } = useTranslation();
    const isProcessing = task.status === 'generating' || task.status === 'pending';

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
                <select
                    className="h-8 px-2 text-xs bg-surface-container-high/50 border border-outline-variant/20 rounded-lg text-gray-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-50 hover:bg-surface-container-highest transition-colors cursor-pointer [&>option]:bg-surface-container-high [&>option]:text-gray-200"
                    value={task.duration}
                    onChange={(e) => updateTask(task.id, { duration: e.target.value as VideoDuration })}
                    disabled={isProcessing}
                >
                    <option value="10s">10s</option>
                    <option value="15s">15s</option>
                </select>
                <select
                    className="h-8 px-2 text-xs bg-surface-container-high/50 border border-outline-variant/20 rounded-lg text-gray-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-50 hover:bg-surface-container-highest transition-colors cursor-pointer [&>option]:bg-surface-container-high [&>option]:text-gray-200"
                    value={task.aspect}
                    onChange={(e) => updateTask(task.id, { aspect: e.target.value as VideoAspect })}
                    disabled={isProcessing}
                >
                    <option value="landscape">16:9</option>
                    <option value="portrait">9:16</option>
                </select>
            </div>

            <button
                className="w-full flex items-center justify-center gap-2 h-9 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-on text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 border border-primary/20 hover:border-primary"
                onClick={() => generateTask(task.id)}
                disabled={!task.prompt.trim() || isProcessing}
            >
                {isProcessing ? (
                    <>
                        <Loader2 size={14} className="animate-spin" />
                        <span>{t('cell.action.generating')}</span>
                    </>
                ) : (
                    <>
                        <Play size={14} fill="currentColor" />
                        <span>{t('cell.action.generate')}</span>
                    </>
                )}
            </button>
        </div>
    );
}
