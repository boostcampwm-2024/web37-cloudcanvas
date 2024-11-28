'use client';
import { Pagination } from '@/components/Pagination';
import { SearchBar } from '@/components/SearchBar';
import { useQueryData } from '@/hooks/useQueryData';
import { useQueryParams } from '@/hooks/useQueryParams';
import { ErrorMessage } from '@/ui/ErrorMessage';
import { LoadingSpinner } from '@/ui/LoadingSpinner';
import { calculateTotalPages } from '@/utils/pagination';
import Link from 'next/link';
import { Suspense } from 'react';

export const PrivateArchitectureBoard = ({ apiUrl }: { apiUrl: string }) => {
    const { params, setParams } = useQueryParams();
    const { data, total, isLoading, error } = useQueryData(apiUrl, params);

    const handleSearch = (keyword: string) =>
        setParams({ search: keyword, page: 1, sort: '', order: '' });

    const handlePageChange = (page: number) => setParams({ page });

    if (error)
        return (
            <Suspense>
                <ErrorMessage message={(error as Error).message} />
            </Suspense>
        );

    return (
        <Suspense>
            <div className="max-w-5xl mx-auto px-4">
                <SearchBar onSearch={handleSearch} />
                {/* 헤더 추가하고 아이템 너비 맞추기 */}
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <div className="mb-10">
                            {data.map((item: any) => (
                                <li
                                    key={item.id}
                                    className="hover:bg-gray-50 border-b flex px-3 py-2 pl-4"
                                >
                                    <Link href={`/canvas/${item.id}`}>
                                        <h3 className="text-lg">
                                            {item.title}
                                        </h3>
                                    </Link>
                                    <div>{item.cost}</div>
                                    <div>{item.createdAt}</div>
                                    <div>{item.updatedAt}</div>
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
        </Suspense>
    );
};
