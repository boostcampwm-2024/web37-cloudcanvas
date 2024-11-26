'use client';
import { ArchitectureBoard } from '@/components/ArchitectureBoard';

export default function Home() {
    return <ArchitectureBoard apiUrl="/public-architectures" />;
}
