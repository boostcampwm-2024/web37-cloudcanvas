import Link from 'next/link';

export const LinkButton = ({ text, href }: { text: string; href: string }) => {
    return (
        <Link
            href={href}
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-800 transition"
        >
            {text}
        </Link>
    );
};
