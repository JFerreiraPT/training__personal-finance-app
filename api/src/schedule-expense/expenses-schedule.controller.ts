import { ExpensesSchedule } from './models/schedule.entity';
import { ExpensesScheduleService } from './expenses-schedule.service';
import {
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  Body,
  Query,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { ScheduleCreateDto } from './models/scheduleCreate.dto';

@Controller('schedule')
export class ExpensesScheduleController {
  constructor(
    private readonly expensesScheduleService: ExpensesScheduleService,
  ) {}

  @Get()
  async all(@Query('fromDate') fromDate, @Query('toDate') toDate) {
    return this.expensesScheduleService.findBetweenDates(fromDate, toDate);
  }

  @Get(':id')
  async find(@Param('id') id: number) {
    try {
      return this.expensesScheduleService.findOrFail({ id });
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Post()
  async create(@Body() body: ScheduleCreateDto): Promise<ExpensesSchedule> {
    return this.expensesScheduleService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: ScheduleCreateDto) {
    try {
      return this.expensesScheduleService.update(id, body);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      return this.expensesScheduleService.delete(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Patch(':id/ispaid')
  async patchIsPaid(
    @Param('id') id: number,
    @Body('is_paid') is_paid: boolean,
  ) {
    return this.expensesScheduleService.patchIsPaid(id, is_paid);
  }
}
