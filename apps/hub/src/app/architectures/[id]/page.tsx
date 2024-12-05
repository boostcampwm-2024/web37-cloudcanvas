'use client';
import { DeleteIcon } from '@/ui/DeleteIcon';
import { EditIcon } from '@/ui/EditIcon';
import { ErrorMessage } from '@/ui/ErrorMessage';
import { ImportIcon } from '@/ui/ImportIcon';
import { LoadingSpinner } from '@/ui/LoadingSpinner';
import { StarIcon } from '@/ui/StarIcon';
import { Tag } from '@/ui/Tag';
import { fetcher } from '@/utils/fetcher';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

interface PublicArchitecture {
    id: number;
    title: string;
    author: { id: number; name: string };
    createdAt: string;
    architecture: Record<string, unknown>;
    cost: number;
    tags: { tag: { name: string } }[];
    stars: any[];
    isAuthor: boolean;
    _count: {
        stars: number;
        imports: number;
    };
}

export default function ArchitectureDetailPage() {
    const params = useParams<{ id: string }>();
    const { data, error, isLoading, mutate } = useSWR<PublicArchitecture>(
        `${process.env.BACK_URL}/public-architectures/${params.id}`,
        fetcher,
    );

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={(error as Error).message} />;

    const {
        title,
        author: { name: author },
        architecture,
        createdAt,
        cost,
        tags,
        stars: starData,
        isAuthor,
        _count: { stars, imports },
    } = data!;

    const isStarred = starData?.length > 0;
    const isLoggedIn = localStorage.getItem('isLoggedIn') !== null;

    const handleDelete = async () => {
        const shouldDelete = confirm('삭제하시겠습니까?');
        if (!shouldDelete) return;
        await fetch(
            `${process.env.BACK_URL}/public-architectures/${params.id}`,
            {
                method: 'DELETE',
                credentials: 'include',
            },
        );
        alert('삭제되었습니다.');
        location.href = '/';
    };

    const toggleStar = async () => {
        await fetch(
            `${process.env.BACK_URL}/public-architectures/${params.id}/stars`,
            {
                method: data!.stars.length > 0 ? 'DELETE' : 'POST',
                credentials: 'include',
            },
        );
        mutate({ ...data!, stars: data!.stars.length > 0 ? [] : [{}] });
    };

    const handleImport = async () => {
        const res = await fetch(
            `${process.env.BACK_URL}/public-architectures/${params.id}/imports`,
            {
                method: 'POST',
                credentials: 'include',
            },
        );
        mutate({
            ...data!,
            _count: { ...data!._count, imports: data!._count.imports + 1 },
        });
        const shouldMove = confirm(
            '저장되었습니다. 캔버스로 이동하시겠습니까?',
        );
        if (shouldMove) {
            const privateArchitecutre = await res.json();
            location.href = `/canvas/${privateArchitecutre.id}`;
        }
    };

    return (
        <div className="mx-auto max-w-3xl flex flex-col gap-10">
            <header className="flex flex-col gap-4">
                <div>
                    <div className="flex mb-2 gap-2">
                        {tags.map(({ tag: { name } }) => (
                            <Tag key={name} tag={name} />
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <h2 className="text-4xl font-extrabold flex-1">
                            {title}
                        </h2>
                        {isAuthor && (
                            <>
                                <button>
                                    <EditIcon />
                                </button>
                                <button onClick={handleDelete}>
                                    <DeleteIcon />
                                </button>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex gap-4 text-gray-500 text-sm">
                    <div>{new Date(createdAt).toLocaleString()}</div>
                    <div>{author}</div>
                    <div className="flex gap-1">
                        <span>{imports}</span>
                        <span>imported</span>
                    </div>
                </div>
                <div className="flex gap-4 justify-end items-center">
                    <div className="mr-2">
                        <span className="font-black text-xl text-emerald-600">
                            ₩{Math.floor(cost).toLocaleString()}
                        </span>
                        <span> / month</span>
                    </div>
                    <button
                        className={`flex items-center gap-1 ${isLoggedIn && isStarred ? 'text-yellow-400' : 'text-gray-300'}`}
                        onClick={toggleStar}
                        disabled={!isLoggedIn}
                    >
                        <StarIcon />
                        <span className="font-bold text-base">{stars}</span>
                    </button>
                    <button onClick={handleImport} disabled={!isLoggedIn}>
                        <ImportIcon />
                    </button>
                </div>
                <hr />
            </header>
            {architecture?.svg ? (
                <div
                    className="w-[48rem]"
                    dangerouslySetInnerHTML={{ __html: `${architecture.svg}` }}
                ></div>
            ) : (
                <ArchitectureImageExample />
            )}
        </div>
    );
}

const ArchitectureImageExample = () => (
    <svg
        width="full"
        viewBox="0 0 224 148"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect width="224" height="148" rx="8" fill="#eeeeee" />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M122.87 66.1598C124.894 66.1598 126.535 64.4415 126.535 62.3218C126.535 60.2022 124.894 58.4839 122.87 58.4839C120.846 58.4839 119.205 60.2022 119.205 62.3218C119.205 64.4415 120.846 66.1598 122.87 66.1598ZM112.726 89.4003H90.5708C89.7935 89.4003 89.3134 88.5524 89.7132 87.8859L104.829 62.6872C105.211 62.0497 106.128 62.0329 106.526 62.6603C108.484 65.7407 113.409 73.5017 117.599 80.1967L122.143 72.5763C122.511 71.9598 123.374 71.9396 123.784 72.5379L134.246 87.8172C134.705 88.4872 134.259 89.4045 133.469 89.4125L123.317 89.5162L112.726 89.4003Z"
            fill="#cccccc"
        />
    </svg>
);
