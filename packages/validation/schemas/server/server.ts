import { z } from 'zod';
import { commonSchema } from '../base';
import { networkInterfaceSchema } from '../vpc/networkinterface';

const serverTagSchema = z.object({
    tag_key: z.string(),
    tag_value: z.string(),
});

export const serverSchema = z
    .object({
        ...commonSchema,
        subnet_no: z.string(),
        name: z.string().optional(),
        server_image_product_code: z.string().optional(),
        server_product_code: z.string().optional(),
        member_server_image_no: z.string().optional(),
        server_image_number: z.string().optional(),
        server_spec_code: z.string().optional(),
        description: z.string().optional(),
        login_key_name: z.string().optional(),
        is_protect_server_termination: z.boolean().optional().default(false),
        init_script_no: z.string().optional(),
        network_interface: z.array(networkInterfaceSchema).max(3).optional(),
        is_encrypted_base_block_storage_volume: z
            .boolean()
            .optional()
            .default(false),
        user_data: z.string().optional(),
        raid_type_name: z.string().optional(),
        tag_list: z.array(serverTagSchema).optional(),
        fee_system_type_code: z
            .enum(['MTRAT', 'FXSUM'])
            .optional()
            .default('MTRAT'),
        access_control_group_configuration_no_list: z
            .array(z.string())
            .optional(),
    })
    .refine(
        (data) => {
            return !!(
                data.server_image_product_code ||
                data.member_server_image_no ||
                data.server_image_number
            );
        },
        {
            message:
                'server_image_product_code, member_server_image_no, server_image_number 중 하나는 필수입니다.',
            path: ['server_image'],
        },
    )
    .refine(
        (data) => {
            if (data.server_image_number && !data.server_spec_code) {
                console.log();
                return false;
            }
            return true;
        },
        {
            message:
                'server_spec_code는 server_image_number가 없을 때 필수입니다.',
            path: ['server_spec_code'],
        },
    );

export type ServerSchema = z.infer<typeof serverSchema>;
