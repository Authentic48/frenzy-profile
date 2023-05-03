import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configSchema } from './configs/config.schema';
import { getRMQConfig } from './configs/rmq.config';
import { RMQModule } from 'nestjs-rmq';
import { PrismaService } from './prisma/prisma.service';
import { ProfileModule } from './modules/profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validationSchema: configSchema }),
    RMQModule.forRootAsync(getRMQConfig()),
    ProfileModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
