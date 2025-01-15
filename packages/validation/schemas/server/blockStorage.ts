import { z } from 'zod';
import { commonSchema } from '../base';

export const blockStorageSchema = z
    .object({
        ...commonSchema,
        size: z.string().refine(
            (size) => {
                const sizeNum = parseInt(size);
                return sizeNum % 10 === 0 && sizeNum >= 10;
            },
            {
                message: 'size는 10의 배수이어야 하며 10 이상이어야 합니다',
            },
        ),
        server_instance_no: z.string(),
        name: z
            .string()
            .min(3)
            .max(30)
            .regex(/^[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9]$/, {
                message:
                    'name은 영문자로 시작하고, 영문자와 숫자, 하이픈만 사용할 수 있으며, 영문자나 숫자로 끝나야 합니다',
            })
            .optional(),
        description: z.string().max(1000).optional(),
        disk_detail_type: z.enum(['SSD', 'HDD']).optional(),
        stop_instance_before_detaching: z.boolean().optional(),
        zone: z.string().optional(),
        snapshot_no: z.string().optional(),
        hypervisor_type: z.enum(['XEN', 'KVM']).optional(),
        volume_type: z.enum(['SSD', 'HDD', 'FB1', 'CB1']).optional(),
        return_protection: z.boolean().optional().default(false),
    })
    .refine(
        (data) => {
            const sizeNum = parseInt(data.size);
            if (data.hypervisor_type === 'XEN' && sizeNum > 2000) return false;
            if (data.hypervisor_type === 'KVM' && sizeNum > 16380) return false;
            return true;
        },
        {
            message:
                'size는 XEN의 경우 2000 이하, KVM의 경우 16380 이하이어야 합니다',
        },
    )
    .refine(
        (data) => {
            if (
                (data.volume_type && !data.hypervisor_type) ||
                (!data.volume_type && data.hypervisor_type)
            ) {
                return false;
            }
            return true;
        },
        {
            message: 'volume_type와 hypervisor_type은 함께 사용해야 합니다',
        },
    )
    .refine(
        (data) => {
            if (data.hypervisor_type === 'KVM' && !data.zone) return false;
            return true;
        },
        {
            message: 'zone은 KVM의 경우 필수입니다',
        },
    )
    .refine(
        (data) => {
            if (data.volume_type && data.disk_detail_type) return false;
            return true;
        },
        {
            message: 'volume_type와 disk_detail_type은 함께 사용할 수 없습니다',
        },
    );

export type BlockStorageSchema = z.infer<typeof blockStorageSchema>;
