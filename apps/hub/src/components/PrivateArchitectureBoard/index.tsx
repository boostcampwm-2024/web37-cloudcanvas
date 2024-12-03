'use client';
import { Pagination } from '@/components/Pagination';
import { SearchBar } from '@/components/SearchBar';
import { useQueryData } from '@/hooks/useQueryData';
import { useQueryParams } from '@/hooks/useQueryParams';
import { ErrorMessage } from '@/ui/ErrorMessage';
import { LoadingSpinner } from '@/ui/LoadingSpinner';
import { calculateTotalPages } from '@/utils/pagination';
import Link from 'next/link';

export const PrivateArchitectureBoard = ({ apiUrl }: { apiUrl: string }) => {
    const { params, setParams } = useQueryParams();
    const { data, total, isLoading, error } = useQueryData(apiUrl, params);

    const handleSearch = (keyword: string) =>
        setParams({ search: keyword, page: 1, sort: '', order: '' });

    const handlePageChange = (page: number) => setParams({ page });

    if (error) return <ErrorMessage message={(error as Error).message} />;

    return (
        <div className="max-w-5xl mx-auto px-4">
            <SearchBar onSearch={handleSearch} />
            <div className="bg-gray-50 flex border-b p-4 font-semibold">
                Architecture
            </div>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <div className="mb-10">
                        {data.map((item: any) => (
                            <li
                                key={item.id}
                                className="hover:bg-slate-50 border-b flex px-3 py-2 pl-4"
                            >
                                <Link
                                    href={`/canvas/${item.id}`}
                                    className="flex flex-col"
                                >
                                    <h3 className="text-lg">{item.title}</h3>
                                    <div className="text-xs flex gap-2 text-gray-400">
                                        <span>마지막 수정</span>
                                        <span>
                                            {new Date(
                                                item.updatedAt,
                                            ).toLocaleString()}
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </div>
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
