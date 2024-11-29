'use client';
import { ArchitectureBoard } from '@/components/ArchitectureBoard';
import { Suspense } from 'react';

export default function MyStarredPage() {
    return (
        <Suspense>
            <ArchitectureBoard
                apiUrl={`${process.env.BACK_URL}/my/public-architectures/stars`}
            />
        </Suspense>
    );
}
