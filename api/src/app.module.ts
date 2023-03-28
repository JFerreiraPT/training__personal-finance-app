import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config';
import { TransactionsEntriesModule } from './transactions-entries/transactions-entries.module';
import { ExpensesScheduleModule } from './schedule-expense/expenses-schedule.module';

import appConfig from 'config/app.config';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      //appconfig is just a factory
      load: [appConfig],

      //validate schema
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true, // models will be loaded automatically
      synchronize: true, //in prod this should not be enabled
    }),
    TransactionsEntriesModule,
    ExpensesScheduleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
