import { PrismaExceptionFilter } from './prisma-exception.filter.js';

describe('PrismaExceptionFilter', () => {
    it('should be defined', () => {
        expect(new PrismaExceptionFilter()).toBeDefined();
    });
});
