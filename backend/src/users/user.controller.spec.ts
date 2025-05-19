import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Status } from '../common/enums';

describe('UsersController', () => {
    let usersController: UsersController;
    let mockUsersService: Partial<UsersService>;

    beforeEach(async () => {
        mockUsersService = {
            findByUsername: jest.fn(),
        };

        const usersModule: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [{ provide: UsersService, useValue: mockUsersService }],
        }).compile();

        usersController = usersModule.get<UsersController>(UsersController);
    });

    describe('login', () => {
        it('return exist user', async () => {
            const mockUser: User = {
                id: 1,
                username: 'test_user',
                role: ['User'],
                status: Status.ENABLED
            };
            jest.spyOn(mockUsersService, 'findByUsername').mockResolvedValue(mockUser);

            const result = await usersController.login('test_user');
            expect(result).toEqual(mockUser);
        });

        it('throw NotFoundException', async () => {
            jest.spyOn(mockUsersService, 'findByUsername').mockResolvedValue(null);

            await expect(usersController.login('nonexistent_user')).rejects.toThrow(
                NotFoundException,
            );
        });

        it('throw UnauthorizedException', async () => {
            const mockUser: User = {
                id: 1,
                username: 'test_user',
                role: ['User'],
                status: Status.DELETED
            };
            jest.spyOn(mockUsersService, 'findByUsername').mockResolvedValue(mockUser);

            await expect(usersController.login('test_user')).rejects.toThrow(
                UnauthorizedException,
            );
        });
    });
});