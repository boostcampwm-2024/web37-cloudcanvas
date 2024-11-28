'use client';
import { ArchitectureBoard } from '@/components/ArchitectureBoard';
import { Suspense } from 'react';

export default function MySharedPage() {
    return (
        <Suspense>
            <ArchitectureBoard
                apiUrl={`${process.env.NEXT_PUBLIC_BACK_URL}/my/public-architectures`}
            />
        </Suspense>
    );
}
