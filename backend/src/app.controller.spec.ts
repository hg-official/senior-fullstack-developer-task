import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';
import { UsersService } from './users/users.service';
import { Status } from './common/enums';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const mockUsersService = {
      findByUsername: jest.fn(),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        AuthGuard,
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return user details', () => {
      const mockRequest: any = { user: { id: 1, username: 'testuser', role: '["admin"]', status: Status.ENABLED } };
      expect(appController.getHello(mockRequest)).toEqual({
        id: 1,
        username: 'testuser',
        role: '["admin"]',
        status: Status.ENABLED
      });
    });
  });
});
