'use client';
import { ArchitectureBoard } from '@/components/ArchitectureBoard';
import { Suspense } from 'react';

export default function Home() {
    return (
        <Suspense>
            <ArchitectureBoard
                apiUrl={`${process.env.BACK_URL}/public-architectures`}
            />
        </Suspense>
    );
}
