import { ArrowDownIcon } from '@/ui/ArrowDownIcon';
import { ArrowUpIcon } from '@/ui/ArrowUpIcon';
import { SortIcon } from '@/ui/SortIcon';

export const BoardHeader = ({
    sort,
    order,
    onSort,
}: {
    sort?: string;
    order?: string;
    onSort: (column: string) => void;
}) => {
    const columns = [
        { key: 'name', title: 'Architecture', width: 'w-full' },
        { key: 'cost', title: 'Costs', width: 'w-40' },
        { key: 'imports', title: 'Imports', width: 'w-40' },
        { key: 'stars', title: 'Stars', width: 'w-40' },
    ];

    const getSortIcon = (columnKey: string) => {
        if (sort === columnKey) {
            if (order === 'asc') return <ArrowUpIcon size={8} />;
            if (order === 'desc') return <ArrowDownIcon size={8} />;
        }
        return <SortIcon size={9} />;
    };

    return (
        <div className="bg-slate-50 flex border-b p-4 font-semibold">
            {columns.map((column) => (
                <div
                    key={column.key}
                    className={`${column.width} cursor-pointer flex items-center gap-1`}
                    onClick={() => onSort(column.key)}
                >
                    <span>{column.title}</span>
                    <span>{getSortIcon(column.key)}</span>
                </div>
            ))}
        </div>
    );
};
