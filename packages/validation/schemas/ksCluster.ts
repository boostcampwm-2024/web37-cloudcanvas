import { z } from 'zod';
import { commonSchema } from './base';

const oidcSchema = z.object({
    issuer_url: z.string(),
    client_id: z.string(),
    username_prefix: z.string().optional(),
    username_claim: z.string().optional(),
    groups_prefix: z.string().optional(),
    groups_claim: z.string().optional(),
    required_claim: z.string().optional(),
});

const logSchema = z.object({
    audit: z.boolean(),
});

const ipAclSchema = z.object({
    action: z.enum(['allow', 'deny']),
    address: z.string(),
    comment: z.string().optional(),
});

export const nksClusterSchema = z
    .object({
        ...commonSchema,
        name: z.string(),
        hypervisor_code: z
            .enum(['XEN', 'KVM', 'RHV'])
            .optional()
            .default('XEN'),
        cluster_type: z.enum([
            'SVR.VNKS.STAND.C002.M008.NET.SSD.B050.G002',
            'SVR.VNKS.STAND.C004.M016.NET.SSD.B050.G002',
            'SVR.VNKS.STAND.C004.M016.G003',
        ]),
        k8s_version: z.string().optional(),
        login_key_name: z.string(),
        zone: z.string(),
        vpc_no: z.string(),
        subnet_no_list: z.array(z.string()).min(1),
        public_network: z.boolean().optional(),
        lb_private_subnet_no: z.string(),
        lb_public_subnet_no: z.string().optional(),
        kube_network_plugin: z.enum(['cilium']).optional(),
        log: logSchema.optional(),
        oidc: oidcSchema.optional(),
        ip_acl_default_action: z.enum(['allow', 'deny']).optional(),
        ip_acl: z.array(ipAclSchema).optional(),
    })
    .refine(
        (data) => {
            if (data.hypervisor_code === 'KVM') {
                return data.cluster_type === 'SVR.VNKS.STAND.C004.M016.G003';
            }
            return data.cluster_type !== 'SVR.VNKS.STAND.C004.M016.G003';
        },
        {
            message: 'KVM 클러스터는 C004.M016.G003 타입만 가능합니다.',
        },
    );

export type NksClusterSchema = z.infer<typeof nksClusterSchema>;
