'use client';
import { ArchitectureBoard } from '@/components/ArchitectureBoard';
import { Suspense } from 'react';

export default function Home() {
    return (
        <Suspense>
            <ArchitectureBoard apiUrl="http://localhost:3000/public-architectures" />
        </Suspense>
    );
}
