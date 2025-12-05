import { useRef, useCallback } from 'react';
import { Upload, X } from 'lucide-react';
import type { Task } from '../../types';
import { useTaskStore } from '../../store/taskStore';
import { useTranslation } from '../../utils/i18n';

interface ImageCellProps {
    task: Task;
    onPreview: (url: string) => void;
}

export default function ImageCell({ task, onPreview }: ImageCellProps) {
    const { updateTask } = useTaskStore();
    const { t } = useTranslation();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isProcessing = task.status === 'generating' || task.status === 'pending';

    const handleImageUpload = useCallback((file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            updateTask(task.id, { referenceImage: e.target?.result as string });
        };
        reader.readAsDataURL(file);
    }, [task.id, updateTask]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleImageUpload(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (isProcessing) return;
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImageUpload(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    return (
        <div className="relative">
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />

            {task.referenceImage ? (
                <div className="relative group w-40 h-24">
                    <img
                        className="w-full h-full object-cover rounded-xl border border-outline-variant/20 cursor-zoom-in transition-transform hover:scale-105"
                        src={task.referenceImage}
                        alt="Reference"
                        onClick={() => onPreview(task.referenceImage!)}
                    />
                    <button
                        className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-error text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-error-container hover:text-error-on"
                        onClick={() => updateTask(task.id, { referenceImage: undefined })}
                        disabled={isProcessing}
                    >
                        <X size={12} />
                    </button>
                </div>
            ) : (
                <div
                    className={`w-40 h-24 border-2 border-dashed border-outline-variant/40 rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary hover:bg-primary/5'
                        }`}
                    onClick={() => !isProcessing && fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <Upload size={16} className="text-gray-400" />
                    <span className="text-[10px] text-gray-500">{t('cell.image.upload')}</span>
                </div>
            )}
        </div>
    );
}
