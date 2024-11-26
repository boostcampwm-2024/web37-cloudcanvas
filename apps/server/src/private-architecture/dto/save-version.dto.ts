export interface SaveVersionDto {
    userId: number;
    id: number;
    title: string;
    architecture: Record<string, any>;
    cost: number;
}
