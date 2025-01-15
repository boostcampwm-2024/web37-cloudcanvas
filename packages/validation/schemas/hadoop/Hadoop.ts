import { z } from 'zod';
import { commonSchema } from '../base';

export const hadoopSchema = z
    .object({
        ...commonSchema,
        vpc_no: z.string(),
        cluster_name: z
            .string()
            .min(3)
            .max(15)
            .regex(/^[a-z0-9가-힣][a-z0-9\-가-힣]*[a-z0-9가-힣]$/, {
                message:
                    'cluster name은 영문, 숫자, 대시(-), 한글만 입력 가능합니다.',
            }),
        cluster_type_code: z.literal('CORE_HADOOP_WITH_SPARK'),
        admin_user_name: z
            .string()
            .min(3)
            .max(15)
            .regex(/^[a-z0-9][a-z0-9\-]*[a-z0-9]$/, {
                message:
                    'admin user name은 소문자로 시작하고, 영어 알파벳 또는 숫자여야 합니다.',
            }),
        admin_user_password: z
            .string()
            .min(8)
            .max(20)
            .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)[^'"/₩&`\s]+$/, {
                message:
                    'admin user password는 대문자, 숫자, 특수문자를 최소 1개 이상 포함해야 합니다.',
            }),
        login_key_name: z.string(),
        edge_node_subnet_no: z.string(),
        master_node_subnet_no: z.string(),
        worker_node_subnet_no: z.string(),
        bucket_name: z.string(),
        master_node_data_storage_type: z.enum(['SSD', 'HDD']),
        worker_node_data_storage_type: z.enum(['SSD', 'HDD']),
        master_node_data_storage_size: z.number().refine(
            (size) => {
                return (
                    (size >= 100 && size <= 2000 && size % 10 === 0) ||
                    size === 4000 ||
                    size === 6000
                );
            },
            {
                message:
                    'storage size는 100에서 2000까지 10GB 단위로 입력하거나, 4000/6000GB로 입력해야 합니다.',
            },
        ),
        worker_node_data_storage_size: z.number().refine(
            (size) => {
                return (
                    (size >= 100 && size <= 2000 && size % 10 === 0) ||
                    size === 4000 ||
                    size === 6000
                );
            },
            {
                message:
                    'storage size는 100에서 2000까지 10GB 단위로 입력하거나, 4000/6000GB로 입력해야 합니다.',
            },
        ),
        image_product_code: z.string().optional(),
        engine_version_code: z.string().optional(),
        edge_node_product_code: z.string().optional(),
        master_node_product_code: z.string().optional(),
        worker_node_product_code: z.string().optional(),
        add_on_code_list: z
            .array(
                z.enum(['PRESTO', 'HBASE', 'IMPALA', 'KUDU', 'TRINO', 'NIFI']),
            )
            .optional(),
        worker_node_count: z.number().min(2).max(10).optional(),
        use_kdc: z.boolean().optional().default(false),
        kdc_realm: z
            .string()
            .regex(/^[A-Z]+\.[A-Z]+$/)
            .max(15)
            .optional(),
        kdc_password: z
            .string()
            .min(8)
            .max(20)
            .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)[^'"/₩&`\s]+$/)
            .optional(),
        use_bootstrap_script: z.boolean().optional().default(false),
        bootstrap_script: z
            .string()
            .max(1024)
            .regex(/^[a-zA-Z0-9\/\._-]+$/)
            .optional(),
        use_data_catalog: z.boolean().optional().default(false),
    })
    .refine(
        (data) => {
            if (data.use_kdc) {
                return !!(data.kdc_realm && data.kdc_password);
            }
            return true;
        },
        {
            message:
                'kdc_realm과 kdc_password는 use_kdc가 true일 때 필수입니다.',
        },
    )
    .refine(
        (data) => {
            if (data.use_bootstrap_script) {
                return !!data.bootstrap_script;
            }
            return true;
        },
        {
            message:
                'bootstrap_script은 use_bootstrap_script이 true일 때 필수입니다.',
        },
    );

export type HadoopSchema = z.infer<typeof hadoopSchema>;
