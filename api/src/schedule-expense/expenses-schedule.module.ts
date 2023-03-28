import { ExpensesSchedule } from './models/schedule.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ExpensesScheduleController } from './expenses-schedule.controller';
import { ExpensesScheduleService } from './expenses-schedule.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExpensesSchedule])],
  controllers: [ExpensesScheduleController],
  providers: [ExpensesScheduleService],
})
export class ExpensesScheduleModule {}
