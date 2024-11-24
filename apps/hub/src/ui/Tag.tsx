import Link from 'next/link';

export const Tag = ({ tag }: { tag: string }) => (
    <Link
        href={`/tags?keyword=${tag}`}
        className="bg-purple-100/60 text-purple-600 border border-purple-300 rounded-md px-1.5"
    >
        {tag}
    </Link>
);