// 任务状态枚举
export type TaskStatus = 'idle' | 'pending' | 'generating' | 'success' | 'error';

// 视频时长
export type VideoDuration = '10s' | '15s';

// 视频比例
export type VideoAspect = 'landscape' | 'portrait';

// 单个任务
export interface Task {
    id: string;
    prompt: string;
    referenceImage?: string; // Base64 格式
    duration: VideoDuration;
    aspect: VideoAspect;
    status: TaskStatus;
    progress: number; // 0-100
    videoUrl?: string;
    errorMessage?: string;
    createdAt: number;
    completedAt?: number;
}

// 应用设置
export interface AppSettings {
    apiKey: string;
    apiEndpoint: string;
    maxConcurrent: number;
    language: 'zh' | 'en';
    rowHeight: 'compact' | 'normal' | 'relaxed';
}

// Store 状态
export interface TaskStore {
    tasks: Task[];
    settings: AppSettings;
    selectedIds: Set<string>;

    // 任务操作
    addTask: () => void;
    removeTask: (id: string) => void;
    updateTask: (id: string, updates: Partial<Task>) => void;
    clearTasks: () => void;

    // 选择操作
    toggleSelect: (id: string) => void;
    selectAll: () => void;
    clearSelection: () => void;
    removeSelected: () => void;

    // 设置操作
    updateSettings: (settings: Partial<AppSettings>) => void;

    // 生成操作
    generateTask: (id: string) => Promise<void>;
    generateSelected: () => void;
    generateAll: () => void;

    // 内部方法
    _processQueue: () => void;
    _executeTask: (id: string) => Promise<void>;
}

// API 模型映射
export const MODEL_MAP: Record<`${VideoDuration}-${VideoAspect}`, string> = {
    '10s-landscape': 'sora-video-landscape-10s',
    '15s-landscape': 'sora-video-landscape-15s',
    '10s-portrait': 'sora-video-portrait-10s',
    '15s-portrait': 'sora-video-portrait-15s',
};

// 获取模型名称
export function getModelName(duration: VideoDuration, aspect: VideoAspect): string {
    return MODEL_MAP[`${duration}-${aspect}`];
}
