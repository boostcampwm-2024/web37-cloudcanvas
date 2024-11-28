import { ErrorMessage } from '@/ui/ErrorMessage';
import { LoadingSpinner } from '@/ui/LoadingSpinner';
import { useQueryData } from '@/hooks/useQueryData';
import { useQueryParams } from '@/hooks/useQueryParams';
import { SearchBar } from '@/components/SearchBar';
import { BoardHeader } from './BoardHeader';
import { ArchitectureList } from './ArchitectureList';
import { Pagination } from '../Pagination';
import { calculateTotalPages } from '@/utils/pagination';

export const ArchitectureBoard = ({ apiUrl }: { apiUrl: string }) => {
    const { params, setParams } = useQueryParams();
    const { data, total, isLoading, error } = useQueryData(apiUrl, params);

    const handleSearch = (keyword: string) =>
        setParams({ search: keyword, page: 1, sort: '', order: '' });

    const handlePageChange = (page: number) => setParams({ page });

    const handleSort = (column: string) => {
        const newOrder =
            params.sort === column && params.order === 'asc' ? 'desc' : 'asc';
        setParams({ sort: column, order: newOrder, page: 1 });
    };

    if (error) return <ErrorMessage message={(error as Error).message} />;

    // return <div>{JSON.stringify(data)}</div>;

    return (
        <div className="max-w-5xl mx-auto px-4">
            <SearchBar onSearch={handleSearch} />
            <BoardHeader
                sort={params.sort}
                order={params.order}
                onSort={handleSort}
            />
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <ArchitectureList data={data ?? []} />
                    <Pagination
                        currentPage={params.page}
                        totalPages={calculateTotalPages(total ?? 0)}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
};
