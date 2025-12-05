import { useState } from 'react';
import { X, Globe } from 'lucide-react';
import { useTaskStore } from '../../store/taskStore';
import { useTranslation } from '../../utils/i18n';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const { settings, updateSettings } = useTaskStore();
    const { t } = useTranslation();
    const [apiKey, setApiKey] = useState(settings.apiKey);
    const [apiEndpoint, setApiEndpoint] = useState(settings.apiEndpoint);
    const [maxConcurrent, setMaxConcurrent] = useState(settings.maxConcurrent);

    if (!isOpen) return null;

    const handleSave = () => {
        updateSettings({ apiKey, apiEndpoint, maxConcurrent });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div className="w-full max-w-md bg-surface-container rounded-2xl shadow-2xl border border-outline-variant/20 p-6 animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-100">{t('settings.title')}</h2>
                    <button className="p-2 rounded-full hover:bg-surface-container-high text-gray-400 hover:text-gray-200 transition-colors" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>
                <div className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                            <Globe size={16} className="text-primary" />
                            {t('settings.language')}
                        </label>
                        <div className="flex bg-surface-container-high rounded-xl p-1 border border-outline-variant/40">
                            <button
                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${settings.language === 'zh' ? 'bg-primary text-primary-on shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}
                                onClick={() => updateSettings({ language: 'zh' })}
                            >
                                {t('settings.language.zh')}
                            </button>
                            <button
                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${settings.language === 'en' ? 'bg-primary text-primary-on shadow-sm' : 'text-gray-400 hover:text-gray-200'}`}
                                onClick={() => updateSettings({ language: 'en' })}
                            >
                                {t('settings.language.en')}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">API Key</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 bg-surface-container-high border border-outline-variant/40 rounded-xl text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="Enter API Key"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">API Endpoint</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 bg-surface-container-high border border-outline-variant/40 rounded-xl text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            value={apiEndpoint}
                            onChange={(e) => setApiEndpoint(e.target.value)}
                            placeholder="http://localhost:8000/v1/chat/completions"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Max Concurrent Tasks</label>
                        <input
                            type="number"
                            className="w-full px-4 py-3 bg-surface-container-high border border-outline-variant/40 rounded-xl text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            value={maxConcurrent}
                            onChange={(e) => setMaxConcurrent(parseInt(e.target.value) || 5)}
                            min={1}
                            max={10}
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-8">
                    <button className="px-4 py-2 rounded-full text-sm font-medium text-primary hover:bg-primary/10 transition-colors" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="px-6 py-2 rounded-full text-sm font-medium bg-primary text-primary-on hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20" onClick={handleSave}>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
