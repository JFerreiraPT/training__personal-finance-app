import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TransactionsEntriesController } from './transactions-entries.controller';
import { TransactionsEntriesService } from './transactions-entries.service';
import { Transaction } from './models/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  controllers: [TransactionsEntriesController],
  providers: [TransactionsEntriesService],
})
export class TransactionsEntriesModule {}
