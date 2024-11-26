export interface SaveArchitectureDto {
    userId: number;
    title: string;
    cost: number;
    architecture: Record<string, any>;
}
