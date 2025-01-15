import { z } from 'zod';
import { commonSchema } from '../base';

export const autoScalingScheduleSchema = z.object({
    ...commonSchema,
    name: z.string(),
    desired_capacity: z.number().min(0).max(30),
    min_size: z.number().min(0).max(30),
    max_size: z.number().min(0).max(30),
    start_time: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{4}$/)
        .optional(),
    end_time: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{4}$/)
        .optional(),
    recurrence: z.string().optional(),
    auto_scaling_group_no: z.string(),
    time_zone: z.enum(['KST', 'UTC']).optional().default('KST'),
}).refine((data) => {
    return data.max_size >= data.min_size;
}, {
    message: 'max_size는 min_size보다 크거나 같아야 합니다',
}).refine((data) => {
    return data.desired_capacity >= data.min_size &&
        data.desired_capacity <= data.max_size;
}, {
    message: 'desired_capacity는 min_size와 max_size 사이여야 합니다',
}).refine((data) => {
    if (!data.recurrence) {
        return !!(data.start_time && data.end_time);
    }
    return true;
}, {
    message: 'recurrence가 없을 경우 start_time과 end_time은 반드시 입력해야 합니다',
});

export type AutoScalingScheduleSchema = z.infer<typeof autoScalingScheduleSchema>;
