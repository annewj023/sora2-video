import type { Task } from '../../types';
import { useTaskStore } from '../../store/taskStore';
import { useTranslation } from '../../utils/i18n';

interface PromptCellProps {
    task: Task;
}

export default function PromptCell({ task }: PromptCellProps) {
    const { updateTask, settings } = useTaskStore();
    const { t } = useTranslation();
    const isProcessing = task.status === 'generating' || task.status === 'pending';

    const heightClass = {
        compact: 'h-20',
        normal: 'h-32',
        relaxed: 'h-48'
    }[settings.rowHeight];

    return (
        <div className="relative group w-full">
            <textarea
                className={`w-full ${heightClass} p-3 text-sm bg-surface-container-high border border-outline-variant/40 rounded-xl text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed scrollbar-thin`}
                value={task.prompt}
                onChange={(e) => updateTask(task.id, { prompt: e.target.value })}
                placeholder={t('cell.prompt.placeholder')}
                disabled={isProcessing}
            />
            <div className="absolute bottom-2 right-2 text-[10px] text-gray-500 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-surface-container-high/80 px-1 rounded">
                {task.prompt.length} chars
            </div>
        </div>
    );
}
