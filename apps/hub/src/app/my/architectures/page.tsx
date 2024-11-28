'use client';
import { ArchitectureBoard } from '@/components/ArchitectureBoard';
import { Suspense } from 'react';

export default function MyArchitecturesPage() {
    return (
        <Suspense>
            <ArchitectureBoard apiUrl="http://localhost:3000/my/public-architectures" />
        </Suspense>
    );
}
