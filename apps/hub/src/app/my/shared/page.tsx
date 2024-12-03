'use client';
import { ArchitectureBoard } from '@/components/ArchitectureBoard';
import { Suspense } from 'react';

export default function MySharedPage() {
    return (
        <Suspense>
            <ArchitectureBoard
                apiUrl={`${process.env.BACK_URL}/my/public-architectures`}
            />
        </Suspense>
    );
}
