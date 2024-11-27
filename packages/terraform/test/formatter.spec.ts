import { describe, it, expect } from 'vitest';
import {
    formatValue,
    formatProperties,
    isNcloudReference,
} from '../util/formatter';

describe('formatter', () => {
    describe('isNcloudReference', () => {
        it('올바른 NCloud 참조 형식을 확인해야 함', () => {
            expect(isNcloudReference('ncloud_vpc.vpc.id')).toBe(true);
            expect(isNcloudReference('ncloud_subnet.my-subnet.id')).toBe(true);
        });

        it('잘못된 참조 형식을 거부해야 함', () => {
            expect(isNcloudReference('vpc.id')).toBe(false);
            expect(isNcloudReference('ncloud_vpc')).toBe(false);
            expect(isNcloudReference('var.region')).toBe(false);
        });
    });

    describe('formatValue', () => {
        it('일반 문자열에 따옴표를 추가해야 함', () => {
            expect(formatValue('test')).toBe('"test"');
        });

        it('리소스 참조는 따옴표 없이 출력해야 함', () => {
            expect(formatValue('ncloud_vpc.vpc.id')).toBe('ncloud_vpc.vpc.id');
        });

        it('배열을 올바르게 포맷팅해야 함', () => {
            expect(formatValue(['a', 'b'])).toBe('["a", "b"]');
            expect(formatValue(['ncloud_vpc.vpc.id'])).toBe(
                '[ncloud_vpc.vpc.id]',
            );
        });
    });

    describe('formatProperties', () => {
        it('기본 속성을 올바르게 포맷팅해야 함', () => {
            const props = {
                name: 'test',
                value: 123,
            };
            expect(formatProperties(props)).toMatch(/name\s+=\s+"test"/);
            expect(formatProperties(props)).toMatch(/value\s+=\s+123/);
        });

        it('중첩된 객체를 올바르게 포맷팅해야 함', () => {
            const props = {
                network: {
                    id: 'test',
                    port: 80,
                },
            };
            const formatted = formatProperties(props);
            expect(formatted).toContain('network {');
            expect(formatted).toMatch(/id\s+=\s+"test"/);
            expect(formatted).toMatch(/port\s+=\s+80/);
        });
    });
});
