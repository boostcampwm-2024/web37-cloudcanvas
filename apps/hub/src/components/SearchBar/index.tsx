'use client';
import { useState } from 'react';
import { SearchIcon } from './SearchIcon';

export const SearchBar = ({
    onSearch,
}: {
    onSearch: (keyword: string) => void;
}) => {
    const [keyword, setKeyword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(keyword);
    };

    return (
        <form onSubmit={handleSubmit} className="flex mx-auto max-w-xl m-10">
            <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="flex-grow px-3 py-2 rounded-l-xl border-l border-y border-gray-300 bg-gray-50"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 rounded-r-xl hover:bg-blue-700"
            >
                <SearchIcon />
            </button>
        </form>
    );
};
