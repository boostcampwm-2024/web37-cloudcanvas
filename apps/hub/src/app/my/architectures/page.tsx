'use client';
import { PrivateArchitectureBoard } from '@/components/PrivateArchitectureBoard';

import { Suspense } from 'react';

export default function MyArchitecturesPage() {
    return (
        <Suspense>
            <PrivateArchitectureBoard apiUrl="'http://localhost:3000/my/private-architectures'" />
        </Suspense>
    );
}
