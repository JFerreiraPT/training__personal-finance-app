import { ExpensesScheduleService } from './expenses-schedule.service';
import { Controller } from '@nestjs/common';

@Controller('schedule')
export class ExpensesScheduleController {
  constructor(
    private readonly expensesScheduleService: ExpensesScheduleService,
  ) {}


  
}
