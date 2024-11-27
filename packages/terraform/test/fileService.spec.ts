import { describe, it, expect, vi, beforeEach } from 'vitest';
import { saveTerraformFiles, writeFile } from '../util/file';
import { promises as fs } from 'fs';

vi.mock('fs', () => ({
    promises: {
        writeFile: vi.fn(),
    },
}));

describe('fileService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('writeFile', () => {
        it('파일에 내용을 작성해야 함', async () => {
            await writeFile('test.tf', 'content');
            expect(vi.mocked(fs.writeFile)).toHaveBeenCalledWith(
                'test.tf',
                'content',
            );
        });

        it('로그 옵션이 true일 때 콘솔에 출력해야 함', async () => {
            const consoleSpy = vi.spyOn(console, 'log');
            await writeFile('test.tf', 'content', { log: true });
            expect(consoleSpy).toHaveBeenCalled();
            consoleSpy.mockRestore();
        });
    });

    describe('saveTerraformFiles', () => {
        it('필요한 모든 파일을 생성해야 함', async () => {
            await saveTerraformFiles('terraform code');
            expect(vi.mocked(fs.writeFile)).toHaveBeenCalledTimes(3);
        });
    });
});
