import { describe, it, expect } from 'vitest';
import { NCloudProvider } from '../model/NCloudProvider';
import { TerraformConvertor } from '../convertor/TerraformConvertor';

describe('TerraformConvertor', () => {
    const provider = new NCloudProvider({
        accessKey: 'var.access_key',
        secretKey: 'var.secret_key',
        region: 'var.region',
        site: 'public',
    });

    it('유효한 Terraform 코드를 생성해야 함', () => {
        const converter = new TerraformConvertor(provider);
        const code = converter.generate();

        expect(code).toContain('terraform {');
        expect(code).toContain('provider "ncloud"');
        expect(code).toContain('required_providers');
    });

    it('리소스를 올바르게 생성해야 함', () => {
        const converter = new TerraformConvertor(provider);
        converter.addResourceFromJson({
            nodes: [
                {
                    id: 'vpc1',
                    type: 'VPC',
                    name: 'my-vpc',
                    properties: {
                        cidrBlock: '172.16.0.0/16',
                    },
                },
            ],
        });

        const code = converter.generate();
        expect(code).toContain('resource "ncloud_vpc"');
        expect(code).toContain('ipv4_cidr_block = "172.16.0.0/16"');
    });
});
