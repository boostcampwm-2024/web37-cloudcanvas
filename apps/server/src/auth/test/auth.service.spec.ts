import { Test, TestingModule } from '@nestjs/testing';
import { vi } from 'vitest';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import { UserService } from 'src/user/user.service';

describe('AuthService', () => {
    let service: AuthService;

    const mockUserService = {
        getTestUser: vi.fn().mockReturnValue({
            id: 1,
            name: 'Test User',
        }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    secret: 'JWT_SECRET',
                    signOptions: { expiresIn: '1d' },
                }),
            ],
            providers: [
                AuthService,
                {
                    provide: UserService,
                    useValue: mockUserService,
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return access token when login', async () => {
        const result = await service.login();
        expect(result.access_token).toBeDefined();
    });
});
