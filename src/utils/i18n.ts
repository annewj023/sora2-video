import { useTaskStore } from '../store/taskStore';

type Language = 'zh' | 'en';

const translations: Record<Language, Record<string, string>> = {
    zh: {
        'app.title': 'SORA2 视频生成',
        'app.batch': '批量生成',
        'app.system_online': '系统在线',
        'toolbar.add_task': '添加任务',
        'toolbar.delete_selected': '删除选中',
        'toolbar.clear_all': '清空所有',
        'toolbar.generate_selected': '生成选中',
        'toolbar.generate_batch': '批量生成',
        'toolbar.row_height.compact': '紧凑',
        'toolbar.row_height.normal': '默认',
        'toolbar.row_height.relaxed': '宽松',
        'table.header.prompt': '提示词',
        'table.header.reference': '参考图',
        'table.header.status': '状态 / 预览',
        'table.header.actions': '操作',
        'table.empty.title': '暂无任务',
        'table.empty.subtitle': '点击 "添加任务" 开始',
        'cell.prompt.placeholder': '请输入视频生成提示词...',
        'cell.image.upload': '上传参考图',
        'cell.status.ready': '就绪',
        'cell.status.queued': '排队中',
        'cell.status.generating': '生成中',
        'cell.status.completed': '完成',
        'cell.status.failed': '失败',
        'cell.action.generate': '生成',
        'cell.action.generating': '生成中',
        'settings.title': '设置',
        'settings.language': '语言',
        'settings.language.zh': '中文',
        'settings.language.en': 'English',
    },
    en: {
        'app.title': 'SORA2 Video',
        'app.batch': 'BATCH GENERATION',
        'app.system_online': 'System Online',
        'toolbar.add_task': 'Add Task',
        'toolbar.delete_selected': 'Delete Selected',
        'toolbar.clear_all': 'Clear All',
        'toolbar.generate_selected': 'Generate Selected',
        'toolbar.generate_batch': 'Generate Batch',
        'toolbar.row_height.compact': 'Compact',
        'toolbar.row_height.normal': 'Normal',
        'toolbar.row_height.relaxed': 'Relaxed',
        'table.header.prompt': 'Prompt',
        'table.header.reference': 'Reference',
        'table.header.status': 'Status / Preview',
        'table.header.actions': 'Actions',
        'table.empty.title': 'No tasks yet',
        'table.empty.subtitle': 'Click "Add Task" to start',
        'cell.prompt.placeholder': 'Enter video generation prompt...',
        'cell.image.upload': 'Upload',
        'cell.status.ready': 'Ready',
        'cell.status.queued': 'Queued',
        'cell.status.generating': 'Generating',
        'cell.status.completed': 'Done',
        'cell.status.failed': 'Failed',
        'cell.action.generate': 'Generate',
        'cell.action.generating': 'Generating',
        'settings.title': 'Settings',
        'settings.language': 'Language',
        'settings.language.zh': 'Chinese',
        'settings.language.en': 'English',
    }
};

export function useTranslation() {
    const language = useTaskStore((state) => state.settings.language);

    const t = (key: string) => {
        return translations[language][key] || key;
    };

    return { t, language };
}
