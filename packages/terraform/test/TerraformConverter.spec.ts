import { describe, it, expect } from 'vitest';
import { TerraformConverter } from '../converter/TerraformConverter';

describe('TerraformConvertor', () => {
    it('유효한 Terraform 코드를 생성해야 함', () => {
        const converter = new TerraformConverter();
        const code = converter.generate;

        expect(code).toContain('terraform {');
        expect(code).toContain('provider "ncloud"');
        expect(code).toContain('required_providers');
    });

    it('리소스를 올바르게 생성해야 함', () => {
        const converter = new TerraformConverter();
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
