import { describe, it, expect } from 'vitest';
import { replaceReferences, resolveReference } from '../util/reference';

describe('Reference', () => {
    const mockResourceMap = new Map([
        ['ncloud_vpc', 'my-vpc'],
        ['ncloud_subnet', 'my-subnet'],
        ['ncloud_access_control_group', 'my-acg'],
    ]);

    describe('resolveReference', () => {
        it('VPC 참조를 올바르게 해석해야 함', () => {
            expect(
                resolveReference('VPC_ID_PLACEHOLDER', mockResourceMap),
            ).toBe('ncloud_vpc.my-vpc.id');
        });

        it('ACG 참조를 올바르게 해석해야 함', () => {
            expect(
                resolveReference('ACG_ID_PLACEHOLDER', mockResourceMap),
            ).toBe('ncloud_access_control_group.my-acg.id');
        });
    });

    describe('replaceReferences', () => {
        it('속성의 참조를 올바르게 치환해야 함', () => {
            const properties = {
                vpc_no: 'VPC_ID_PLACEHOLDER',
                name: 'test',
            };
            const result = replaceReferences(properties, mockResourceMap);
            expect(result.vpc_no).toBe('ncloud_vpc.my-vpc.id');
            expect(result.name).toBe('test');
        });

        it('배열 내 참조를 올바르게 치환해야 함', () => {
            const properties = {
                access_control_groups: ['ACG_ID_PLACEHOLDER'],
            };
            const result = replaceReferences(properties, mockResourceMap);
            expect(result.access_control_groups[0]).toBe(
                'ncloud_access_control_group.my-acg.id',
            );
        });
    });
});
