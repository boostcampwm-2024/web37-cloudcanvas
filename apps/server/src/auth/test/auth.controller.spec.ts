import { Test, TestingModule } from '@nestjs/testing';
import { vi } from 'vitest';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { AuthenticatedUser } from 'src/types/authenticated-user.interface';

describe('AuthController', () => {
    let controller: AuthController;
    let service: AuthService;

    const mockUser = { id: 1, name: 'Test User' } as AuthenticatedUser;

    const mockAuthService = {
        login: vi.fn().mockResolvedValue({ access_token: 'ACCESS_TOKEN' }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    secret: 'JWT_SECRET',
                    signOptions: { expiresIn: '1d' },
                }),
            ],
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: mockAuthService,
                },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        service = module.get<AuthService>(AuthService);
    });

    it('AuthController는 정상적으로 정의되어야 한다.', () => {
        expect(controller).toBeDefined();
    });

    describe('POST /auth/login', () => {
        it('사용자가 로그인에 성공하면 access token을 반환해야 한다.', async () => {
            const result = await controller.login();

            expect(service.login).toHaveBeenCalledWith();
            expect(result).toEqual({ access_token: 'ACCESS_TOKEN' });
        });

        it('service.login이 다른 값을 반환해도 그대로 반환해야 한다.', async () => {
            const mockLoginResult = {
                refresh_token: 'REFRESH_TOKEN',
                access_token: 'DIFFERENT_TOKEN',
            };
            mockAuthService.login.mockReturnValueOnce(mockLoginResult);

            const result = await controller.login();

            expect(result).toEqual(mockLoginResult);
        });

        it('사용자가 로그인에 실패하면 에러가 발생해야 한다.', async () => {
            mockAuthService.login.mockRejectedValueOnce(new Error());

            await expect(controller.login()).rejects.toThrow();
        });
    });

    describe('GET /auth/check', () => {
        it('인증된 사용자일 경우 사용자 정보를 반환해야 한다. ', () => {
            const result = controller.check(mockUser);

            expect(result).toEqual(mockUser);
        });
    });
});
