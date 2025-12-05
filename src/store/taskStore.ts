import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task, TaskStore, AppSettings } from '../types';
import { generateVideo } from '../services/soraApi';

// 生成唯一ID
const generateId = () => `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// 默认设置
const defaultSettings: AppSettings = {
    apiKey: '',
    apiEndpoint: 'http://localhost:8000/v1/chat/completions',
    maxConcurrent: 5,
    language: 'zh',
    rowHeight: 'normal',
};

// 创建默认任务
const createDefaultTask = (): Task => ({
    id: generateId(),
    prompt: '',
    duration: '10s',
    aspect: 'landscape',
    status: 'idle',
    progress: 0,
    createdAt: Date.now(),
});

// 并发控制
let runningCount = 0;
const pendingQueue: string[] = [];

export const useTaskStore = create<TaskStore>()(
    persist(
        (set, get) => ({
            tasks: [createDefaultTask()],
            settings: defaultSettings,
            selectedIds: new Set<string>(),

            // 添加任务
            addTask: () => {
                set((state) => ({
                    tasks: [...state.tasks, createDefaultTask()],
                }));
            },

            // 删除任务
            removeTask: (id) => {
                set((state) => ({
                    tasks: state.tasks.filter((t) => t.id !== id),
                    selectedIds: new Set([...state.selectedIds].filter((i) => i !== id)),
                }));
            },

            // 更新任务
            updateTask: (id, updates) => {
                set((state) => ({
                    tasks: state.tasks.map((t) =>
                        t.id === id ? { ...t, ...updates } : t
                    ),
                }));
            },

            // 清空所有任务
            clearTasks: () => {
                set({ tasks: [createDefaultTask()], selectedIds: new Set() });
            },

            // 切换选择
            toggleSelect: (id) => {
                set((state) => {
                    const newSelected = new Set(state.selectedIds);
                    if (newSelected.has(id)) {
                        newSelected.delete(id);
                    } else {
                        newSelected.add(id);
                    }
                    return { selectedIds: newSelected };
                });
            },

            // 全选
            selectAll: () => {
                set((state) => ({
                    selectedIds: new Set(state.tasks.map((t) => t.id)),
                }));
            },

            // 清除选择
            clearSelection: () => {
                set({ selectedIds: new Set() });
            },

            // 删除选中
            removeSelected: () => {
                set((state) => ({
                    tasks: state.tasks.filter((t) => !state.selectedIds.has(t.id)),
                    selectedIds: new Set(),
                }));
            },

            // 更新设置
            updateSettings: (updates) => {
                set((state) => ({
                    settings: { ...state.settings, ...updates },
                }));
            },

            // 处理队列 (内部方法)
            _processQueue: () => {
                const { settings, tasks } = get();
                const store = get();

                while (runningCount < settings.maxConcurrent && pendingQueue.length > 0) {
                    const taskId = pendingQueue.shift()!;
                    const task = tasks.find(t => t.id === taskId);

                    if (task && task.status === 'pending') {
                        runningCount++;
                        store._executeTask(taskId);
                    }
                }
            },

            // 执行单个任务生成 (内部方法)
            _executeTask: async (id: string) => {
                const { settings, updateTask } = get();
                const task = get().tasks.find(t => t.id === id);
                const store = get();

                if (!task || !task.prompt.trim()) {
                    runningCount--;
                    store._processQueue();
                    return;
                }

                updateTask(id, { status: 'generating', progress: 0 });

                try {
                    const videoUrl = await generateVideo({
                        apiEndpoint: settings.apiEndpoint,
                        apiKey: settings.apiKey,
                        prompt: task.prompt,
                        duration: task.duration,
                        aspect: task.aspect,
                        imageBase64: task.referenceImage,
                        onProgress: (progress) => {
                            updateTask(id, { progress });
                        },
                    });

                    updateTask(id, {
                        status: 'success',
                        progress: 100,
                        videoUrl,
                        completedAt: Date.now(),
                    });
                } catch (error) {
                    updateTask(id, {
                        status: 'error',
                        errorMessage: error instanceof Error ? error.message : '生成失败',
                    });
                } finally {
                    runningCount--;
                    store._processQueue();
                }
            },

            // 生成单个任务
            generateTask: async (id: string) => {
                const task = get().tasks.find(t => t.id === id);
                if (!task || !task.prompt.trim()) return;

                get().updateTask(id, { status: 'pending', progress: 0 });
                pendingQueue.push(id);
                get()._processQueue();
            },

            // 生成选中的任务
            generateSelected: () => {
                const { selectedIds, tasks, updateTask } = get();

                tasks.forEach((task) => {
                    if (selectedIds.has(task.id) && task.prompt.trim() && task.status !== 'generating') {
                        updateTask(task.id, { status: 'pending', progress: 0 });
                        pendingQueue.push(task.id);
                    }
                });

                get()._processQueue();
            },

            // 生成所有任务
            generateAll: () => {
                const { tasks, updateTask } = get();

                tasks.forEach((task) => {
                    if (task.prompt.trim() && task.status !== 'generating') {
                        updateTask(task.id, { status: 'pending', progress: 0 });
                        pendingQueue.push(task.id);
                    }
                });

                get()._processQueue();
            },
        }),
        {
            name: 'sora2-video-storage',
            partialize: (state) => ({
                tasks: state.tasks,
                settings: state.settings,
            }),
            merge: (persisted: unknown, current) => ({
                ...current,
                ...(persisted as Partial<TaskStore>),
                selectedIds: new Set(),
            }),
        }
    )
);
