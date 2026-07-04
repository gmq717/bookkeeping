import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'
import { PrismaModule } from './prisma/prisma.module'
import { HealthModule } from './health/health.module'
import { AccountModule } from './account/account.module'
import { CategoryModule } from './category/category.module'
import { TransactionModule } from './transaction/transaction.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot({
      pinoHttp: { level: process.env.LOG_LEVEL ?? 'info' },
    }),
    PrismaModule,
    HealthModule,
    AccountModule,
    CategoryModule,
    TransactionModule,
  ],
})
export class AppModule {}
