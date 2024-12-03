import Link from 'next/link';
import { Tag } from '../../ui/Tag';

export const ArchitectureItem = ({
    id,
    title,
    author,
    cost,
    createdAt,
    tags,
    _count,
}: {
    id: number;
    title: string;
    author: { id: number; name: string };
    cost: number;
    createdAt: string;
    tags: { tag: { name: string } }[];
    _count: {
        imports: number;
        stars: number;
    };
}) => {
    const { imports, stars } = _count;
    return (
        <li className="hover:bg-gray-50 border-b flex px-3 py-2 pl-4 items-center">
            <div className="flex flex-col w-full">
                <div>
                    <Link href={`/architectures/${id}`}>{title}</Link>
                </div>
                <div className="text-xs text-gray-400 flex gap-3">
                    <div>{new Date(createdAt).toLocaleString()}</div>
                    <div>{author.name}</div>
                </div>
                <div className="flex gap-1 mt-1">
                    {tags?.map(({ tag: { name } }) => (
                        <Tag key={name} tag={name} />
                    ))}
                </div>
            </div>
            <div className="w-52">₩ {cost}</div>
            <div className="w-40">{stars}</div>
            <div className="w-40">{imports}</div>
        </li>
    );
};
