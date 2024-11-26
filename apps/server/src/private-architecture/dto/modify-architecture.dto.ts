export interface ModifyArchitectureDto {
    userId: number;
    id: number;
    title?: string;
    architecture?: Record<string, any>;
    cost?: number;
}
