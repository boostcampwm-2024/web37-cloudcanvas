import { z } from 'zod';
import { commonSchema } from '../base';

export const launchConfigurationSchema = z
    .object({
        ...commonSchema,
        name: z
            .string()
            .min(1)
            .regex(/^[a-zA-Z0-9\-]+$/, {
                message: 'name은 영문, 숫자, 하이픈만 사용 가능합니다',
            })
            .optional(),
        server_image_product_code: z.string().optional(),
        server_product_code: z.string().optional(),
        member_server_image_no: z.string().optional(),
        login_key_name: z.string().optional(),
        init_script_no: z.string().optional(),
        user_data: z.string().optional(),
        access_control_group_no_list: z.array(z.string()).optional(),
        is_encrypted_volume: z.boolean().optional().default(false),
    })
    .refine(
        (data) => {
            return !!(
                data.server_image_product_code || data.member_server_image_no
            );
        },
        {
            message:
                'server_image_product_code, member_server_image_no 중 하나는 필수입니다.',
            path: ['server_image'],
        },
    );

export type LaunchConfigurationSchema = z.infer<
    typeof launchConfigurationSchema
>;
