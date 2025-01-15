import { z } from 'zod';
import { commonSchema } from '../base';

export const autoScalingGroupSchema = z.object({
    ...commonSchema,
    name: z.string().optional(),
    launch_configuration_no: z.string(),
    desired_capacity: z.number().min(0).max(30).optional(),
    min_size: z.number().min(0).max(30),
    max_size: z.number().min(0).max(30),
    ignore_capacity_changes: z.boolean().optional(),
    default_cooldown: z.number().optional(),
    health_check_type_code: z.enum(['SVR', 'LOADB']).optional(),
    wait_for_capacity_timeout: z.string().optional(),
    health_check_grace_period: z.number().optional(),
    zone_no_list: z.array(z.string()).optional(),
    subnet_no: z.string().optional(),
    access_control_group_no_list: z.array(z.string()).optional(),
    target_group_list: z.array(z.string()).optional(),
    server_name_prefix: z.string().optional(),
}).refine((data) => {
    return data.max_size >= data.min_size;
}, {
    message: 'max size는 min size보다 크거나 같아야 합니다',
}).refine((data) => {
    if (data.desired_capacity) {
        return data.desired_capacity >= data.min_size &&
            data.desired_capacity <= data.max_size;
    }
    return true;
}, {
    message: 'desired_capacity는 min_size와 max_size 사이여야 합니다',
}).refine((data) => {
    if (data.health_check_type_code === 'LOADB') {
        return !!data.health_check_grace_period;
    }
    return true;
}, {
    message: 'health_check_type_code가 LOADB일 경우 health_check_grace_period는 필수입니다',
});

export type AutoScalingGroupSchema = z.infer<typeof autoScalingGroupSchema>;
