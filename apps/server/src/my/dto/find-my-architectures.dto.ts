export interface FindMyArchitecturesDto {
    page?: number;
    limit?: number;
    search?: string;
    sort?: string;
    order?: string;
    userId: number;
}
