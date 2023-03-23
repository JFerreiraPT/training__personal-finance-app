import { BaseService } from './../common/base/base.service';
import { Transaction } from './models/transaction.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsEntriesService extends BaseService<Transaction> {
  constructor(
    @InjectRepository(Transaction)
    transactionRepository: Repository<Transaction>,
  ) {
    super(transactionRepository);
  }
}
