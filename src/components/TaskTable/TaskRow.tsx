import { useState } from 'react';
import { useTaskStore } from '../../store/taskStore';
import type { Task } from '../../types';
import PromptCell from './PromptCell';
import ImageCell from './ImageCell';
import VideoStatusCell from './VideoStatusCell';
import ActionCell from './ActionCell';

interface TaskRowProps {
    task: Task;
    index: number;
}

export default function TaskRow({ task, index }: TaskRowProps) {
    const { toggleSelect, selectedIds, settings } = useTaskStore();
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    const isSelected = selectedIds.has(task.id);

    const paddingClass = {
        compact: 'py-2',
        normal: 'py-4',
        relaxed: 'py-6'
    }[settings.rowHeight];

    return (
        <>
            <tr className={`group transition-colors hover:bg-surface-container-high/50 ${isSelected ? 'bg-primary/5 hover:bg-primary/10' : ''}`}>
                {/* Checkbox */}
                <td className={`px-4 ${paddingClass} align-middle border-b border-outline-variant/10`}>
                    <div className="flex items-center justify-center">
                        <input
                            type="checkbox"
                            className="appearance-none w-4 h-4 rounded border border-outline-variant/40 bg-transparent checked:bg-primary checked:border-primary checked:text-primary-on focus:ring-0 focus:ring-offset-0 cursor-pointer transition-all relative after:content-[''] after:absolute after:hidden checked:after:block after:left-[5px] after:top-[2px] after:w-[5px] after:h-[9px] after:border-r-2 after:border-b-2 after:border-white after:rotate-45 hover:border-primary/50"
                            checked={isSelected}
                            onChange={() => toggleSelect(task.id)}
                        />
                    </div>
                </td>

                {/* Index */}
                <td className={`px-4 ${paddingClass} align-middle border-b border-outline-variant/10`}>
                    <div className="text-xs font-medium text-gray-500 text-center font-mono">
                        {String(index).padStart(2, '0')}
                    </div>
                </td>

                {/* Prompt */}
                <td className={`px-4 ${paddingClass} align-middle border-b border-outline-variant/10`}>
                    <PromptCell task={task} />
                </td>

                {/* Reference Image */}
                <td className={`px-4 ${paddingClass} align-middle border-b border-outline-variant/10`}>
                    <div className="flex justify-center">
                        <ImageCell task={task} onPreview={setLightboxImage} />
                    </div>
                </td>

                {/* Video / Status */}
                <td className={`px-4 ${paddingClass} align-middle border-b border-outline-variant/10`}>
                    <div className="flex justify-center">
                        <VideoStatusCell task={task} />
                    </div>
                </td>

                {/* Actions */}
                <td className={`px-4 ${paddingClass} align-middle border-b border-outline-variant/10`}>
                    <ActionCell task={task} />
                </td>
            </tr>

            {/* Lightbox */}
            {lightboxImage && (
                <tr className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={() => setLightboxImage(null)}>
                    <td className="w-full h-full p-8 flex items-center justify-center pointer-events-none">
                        <img
                            src={lightboxImage}
                            alt="Preview"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button
                            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white pointer-events-auto transition-colors"
                            onClick={() => setLightboxImage(null)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </td>
                </tr>
            )}
        </>
    );
}
