import { useTaskStore } from '../../store/taskStore';
import TaskRow from './TaskRow.tsx';
import { useTranslation } from '../../utils/i18n';

export default function TaskTable() {
    const { tasks, selectedIds, selectAll, clearSelection } = useTaskStore();
    const { t } = useTranslation();

    const allSelected = tasks.length > 0 && selectedIds.size === tasks.length;

    const handleSelectAll = () => {
        if (allSelected) {
            clearSelection();
        } else {
            selectAll();
        }
    };

    return (
        <div className="flex-1 overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-low shadow-xl flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-outline-variant/20 scrollbar-track-transparent relative">
                <table className="w-full border-separate border-spacing-0 table-fixed">
                    <thead className="sticky top-0 z-30 bg-surface-container-low/95 backdrop-blur-md shadow-sm">
                        <tr>
                            <th className="w-16 px-4 py-4 text-center border-b border-outline-variant/20">
                                <div className="flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        className="appearance-none w-4 h-4 rounded border border-outline-variant/40 bg-transparent checked:bg-primary checked:border-primary checked:text-primary-on focus:ring-0 focus:ring-offset-0 cursor-pointer transition-all relative after:content-[''] after:absolute after:hidden checked:after:block after:left-[5px] after:top-[2px] after:w-[5px] after:h-[9px] after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                                        checked={allSelected}
                                        onChange={handleSelectAll}
                                    />
                                </div>
                            </th>
                            <th className="w-20 px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-outline-variant/20 text-center">#</th>
                            <th className="px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-outline-variant/20 text-center">{t('table.header.prompt')}</th>
                            <th className="w-80 px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-outline-variant/20 text-center">{t('table.header.reference')}</th>
                            <th className="w-96 px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-outline-variant/20 text-center">{t('table.header.status')}</th>
                            <th className="w-64 px-4 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-outline-variant/20 text-center">{t('table.header.actions')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/10">
                        {tasks.map((task, index) => (
                            <TaskRow key={task.id} task={task} index={index + 1} />
                        ))}
                    </tbody>
                </table>
                {tasks.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                        <div className="w-16 h-16 mb-4 rounded-full bg-surface-container-high flex items-center justify-center">
                            <span className="text-2xl">📝</span>
                        </div>
                        <p className="text-sm font-medium">{t('table.empty.title')}</p>
                        <p className="text-xs mt-1 opacity-60">{t('table.empty.subtitle')}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
