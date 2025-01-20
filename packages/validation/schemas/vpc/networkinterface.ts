import { z } from 'zod';

export const networkInterfaceSchema = z.object({
    network_interface_no: z.string(),
    order: z.number().int().min(0).max(2),
    subnet_no: z.string().optional(),
    private_ip: z.string().optional(),
});
