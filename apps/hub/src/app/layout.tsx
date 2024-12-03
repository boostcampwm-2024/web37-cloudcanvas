import type { Metadata } from 'next';
import './globals.css';
import { GlobalHeader } from '@/components/GlobalHeader';
import { gamjaFlower } from './fonts';

export const metadata: Metadata = {
    title: 'Cloud Canvas',
    description: 'Draw your cloud architecture with ease',
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="ko">
            <body className={`antialiased ${gamjaFlower.variable}`}>
                <GlobalHeader />
                <main className="max-w-7xl mx-auto mt-10">{children}</main>
            </body>
        </html>
    );
}
