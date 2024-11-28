'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LinkButton } from '@/ui/LinkButton';

export const GlobalHeader = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACK_URL}/auth/login`,
            {
                method: 'POST',
                credentials: 'include',
            },
        );
        if (res.ok) {
            setIsLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true');
            router.refresh();
            router.push('/');
        }
    };

    const handleLogout = () => {
        fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
        });
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        router.refresh();
        router.push('/');
    };

    return (
        <header className="sticky top-0 w-full bg-slate-100">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                <Link href="/">
                    <h1 className="text-xl font-bold">Cloud Canvas</h1>
                </Link>
                {/* TODO: 검색창 추가(새 컴포넌트로) */}
                <nav className="flex">
                    <ul className="flex space-x-6">
                        {isLoggedIn ? (
                            <>
                                <li>
                                    <Link href="/my/architectures">
                                        마이 페이지
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout}>
                                        로그아웃
                                    </button>
                                </li>
                                <li>
                                    <NewCanvasButton />
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href="#" onClick={handleLogin}>
                                        로그인
                                    </Link>
                                </li>
                                <li>
                                    <NewCanvasButton />
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

const NewCanvasButton = () => <LinkButton text="새 캔버스" href="/canvas" />;
