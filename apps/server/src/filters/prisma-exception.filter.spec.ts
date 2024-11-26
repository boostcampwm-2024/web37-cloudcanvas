import { PrismaExceptionFilter } from './prisma-exception.filter';

describe('PrismaExceptionFilter', () => {
    it('should be defined', () => {
        expect(new PrismaExceptionFilter()).toBeDefined();
    });
});
