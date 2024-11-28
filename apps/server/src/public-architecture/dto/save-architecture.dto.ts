export interface SaveArchitectureDto {
    title: string;
    architecture: Record<string, any>;
    cost: number;
    tags?: string[];
    userId: number;
}
