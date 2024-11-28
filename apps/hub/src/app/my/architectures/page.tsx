'use client';
import { PrivateArchitectureBoard } from '@/components/PrivateArchitectureBoard';

import { Suspense } from 'react';

export default function MyArchitecturesPage() {
    return (
        <Suspense>
            <PrivateArchitectureBoard
                apiUrl={`${process.env.NEXT_PUBLIC_BACK_URL}/my/private-architectures`}
            />
        </Suspense>
    );
}
