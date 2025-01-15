import { z } from 'zod';
import { commonSchema } from './base';

export const blockStorageSnapshotSchema = z.object({
    ...commonSchema,
    block_storage_instance_no: z.string(),
    name: z.string().optional(),
    description: z.string().optional(),
    hypervisor_type: z.enum(['XEN', 'KVM']).optional(),
});

export type BlockStorageSnapshotSchema = z.infer<
    typeof blockStorageSnapshotSchema
>;
