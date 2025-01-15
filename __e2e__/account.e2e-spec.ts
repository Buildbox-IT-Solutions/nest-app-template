import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '~/app.module';
import { PrismaService } from '~/core/infra/gateways/repositories/prisma/connection/prisma.service';
import { AbstractUserRepository } from '~/modules/account/application/gateways/repositories/user.repository';
import supertest from 'supertest';

describe('Account (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let userRepository: AbstractUserRepository;

  beforeAll(async () => {
    process.env.DATABASE_URL = 'file:./e2e.db';

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prismaService = app.get(PrismaService);
    userRepository = app.get(AbstractUserRepository);

    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

    await prismaService.onModuleInit();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await prismaService.$disconnect();
  });

  afterEach(async () => {
    await prismaService.$queryRaw`DELETE FROM User`;
  });

  it('should create a user with success', async () => {
    const input = {
      name: 'Test E2E',
      email: 'test_e2e@example.com',
      cpf: '359.241.870-04',
      password: 'Password@123',
    };

    await supertest(app.getHttpServer()).post('/account').send(input).expect(201);

    const createdUser = await userRepository.findByEmail(input.email);
    expect(createdUser).toBeDefined();
    expect(createdUser?.email).toBe(input.email);
    expect(createdUser?.cpf).toBe(input.cpf);
  });
});
