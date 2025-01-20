import { z } from 'zod';

export const nodeConfigSchema = z.object({
    node_product_code: z.string(),
    subnet_no: z.string(),
    node_count: z.number().min(3).max(10).optional(),
    storage_size: z
        .number()
        .min(100)
        .max(2000)
        .refine((size) => size % 10 === 0, {
            message: 'storage size는 10의 배수여야 합니다.',
        })
        .optional(),
});
