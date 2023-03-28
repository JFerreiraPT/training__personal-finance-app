import { ExpensesSchedule } from './models/schedule.entity';
import { BaseService } from './../common/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Between, LessThan, MoreThan } from 'typeorm';
import { filter } from 'rxjs';

@Injectable()
export class ExpensesScheduleService extends BaseService<ExpensesSchedule> {
  constructor(
    @InjectRepository(ExpensesSchedule)
    private readonly expensesScheduleRepository: Repository<ExpensesSchedule>,
  ) {
    super(expensesScheduleRepository);
  }

  async findBetweenDates(fromDate?, toDate?) {
    let filters = {};

    if (fromDate && toDate) {
      filters = {
        date: Between(new Date(fromDate), new Date(toDate)),
      };
    } else if (fromDate) {
      filters = {
        date: MoreThan(new Date(fromDate)),
      };
    } else if (toDate) {
      filters = {
        date: LessThan(new Date(toDate)),
      };
    }

    return this.expensesScheduleRepository.find({
      where: filters,
    });
  }

  async patchIsPaid(id: number, isPaid: boolean) {
    await this.expensesScheduleRepository.update(id, {
      isPaid,
    });
    return super.findOne({ id });
  }
}
