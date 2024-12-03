import React from 'react';

export const Button = ({
    children,
    ...props
}: {
    children: React.ReactNode;
    [key: string]: unknown;
}) => {
    return (
        <button
            className="bg-blue-600 text-white font-semibold py-1.5 px-4 rounded-lg hover:bg-blue-800 transition"
            {...props}
        >
            {children}
        </button>
    );
};
