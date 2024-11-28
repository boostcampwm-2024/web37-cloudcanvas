import Link from 'next/link';

export const LinkButton = ({ text, href }: { text: string; href: string }) => {
    return (
        <Link
            href={href}
            className="bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
            {text}
        </Link>
    );
};
