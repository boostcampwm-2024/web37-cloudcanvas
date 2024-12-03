import Link from 'next/link';

export const Tag = ({ tag }: { tag: string }) => (
    <Link
        // href={`/tags/${tag}`}
        href="#"
        className="text-[10px] bg-purple-100/60 text-purple-600 border border-purple-100 rounded-md px-1.5 cursor-default"
    >
        {tag}
    </Link>
);
