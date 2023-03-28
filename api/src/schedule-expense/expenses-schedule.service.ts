import { ExpensesSchedule } from './models/schedule.entity';
import { BaseService } from './../common/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ExpensesScheduleService extends BaseService<ExpensesSchedule> {
  constructor(
    @InjectRepository(ExpensesSchedule)
    expensesScheduleRepository: Repository<ExpensesSchedule>,
  ) {
    super(expensesScheduleRepository);
  }
}
