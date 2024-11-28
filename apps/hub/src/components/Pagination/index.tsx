import { ArrowLeftIcon } from '@/ui/ArrowLeftIcon';
import { ArrowRightIcon } from '@/ui/ArrowRightIcon';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) => {
    if (totalPages <= 1) return null;

    const getVisiblePages = () => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (
            let i = Math.max(2, currentPage - delta);
            i <= Math.min(totalPages - 1, currentPage + delta);
            i++
        ) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        } else if (totalPages > 1) {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };

    return (
        <div className="flex w-fit mx-auto mb-10 justify-center items-center gap-1">
            <button
                className={`px-3 h-9 rounded hover:bg-gray-100 transition-colors
                    ${currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                aria-label="Previous page"
            >
                <ArrowLeftIcon />
            </button>
            {getVisiblePages().map((page, index) => (
                <button
                    key={index}
                    className={`px-3 h-9 rounded transition-colors
                        ${
                            typeof page === 'number' && currentPage === page
                                ? 'bg-blue-100 text-blue-600 font-bold'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    onClick={() =>
                        typeof page === 'number' && onPageChange(page)
                    }
                    disabled={typeof page !== 'number'}
                    aria-current={
                        typeof page === 'number' && currentPage === page
                            ? 'page'
                            : undefined
                    }
                >
                    {page}
                </button>
            ))}
            <button
                className={`px-3 h-9 rounded hover:bg-gray-100 transition-colors
                    ${currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() =>
                    currentPage < totalPages && onPageChange(currentPage + 1)
                }
                disabled={currentPage >= totalPages}
                aria-label="Next page"
            >
                <ArrowRightIcon />
            </button>
        </div>
    );
};
