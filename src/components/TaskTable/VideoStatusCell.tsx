import { Loader2, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import type { Task } from '../../types';
import { useTranslation } from '../../utils/i18n';

interface VideoStatusCellProps {
    task: Task;
}

export default function VideoStatusCell({ task }: VideoStatusCellProps) {
    const { t } = useTranslation();
    const containerClass = "w-40 h-24 rounded-xl border border-outline-variant/20 bg-surface-container-high/50 flex flex-col items-center justify-center relative overflow-hidden group";

    switch (task.status) {
        case 'idle':
            return (
                <div className={containerClass}>
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                        <Clock size={20} />
                        <span className="text-xs font-medium">{t('cell.status.ready')}</span>
                    </div>
                </div>
            );

        case 'pending':
            return (
                <div className={containerClass}>
                    <div className="flex flex-col items-center gap-2 text-secondary">
                        <Loader2 size={20} className="animate-spin" />
                        <span className="text-xs font-medium">{t('cell.status.queued')}</span>
                    </div>
                </div>
            );

        case 'generating':
            return (
                <div className={containerClass}>
                    <div className="absolute inset-0 bg-primary/5" />
                    <div className="flex flex-col items-center gap-2 text-primary z-10 w-full px-4">
                        <div className="flex items-center gap-2">
                            <Loader2 size={16} className="animate-spin" />
                            <span className="text-xs font-bold">{task.progress}%</span>
                        </div>
                        <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-300 ease-out"
                                style={{ width: `${task.progress}%` }}
                            />
                        </div>
                    </div>
                </div>
            );

        case 'success':
            return (
                <div className={`${containerClass} border-primary/20`}>
                    {task.videoUrl ? (
                        <video
                            className="w-full h-full object-cover"
                            src={task.videoUrl}
                            controls
                            muted
                            preload="metadata"
                        />
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-green-400">
                            <CheckCircle2 size={20} />
                            <span className="text-xs font-medium">{t('cell.status.completed')}</span>
                        </div>
                    )}
                </div>
            );

        case 'error':
            return (
                <div className={`${containerClass} border-error/30 bg-error/5`}>
                    <div className="flex flex-col items-center gap-1 text-error p-2 text-center">
                        <AlertCircle size={20} />
                        <span className="text-[10px] font-medium leading-tight line-clamp-2">
                            {task.errorMessage || t('cell.status.failed')}
                        </span>
                    </div>
                </div>
            );

        default:
            return null;
    }
}
