import { Transaction } from './models/transaction.entity';
import { TransactionCreateDto } from './models/transaction-create.dto';
import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Query,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { TransactionsEntriesService } from './transactions-entries.service';
import { json } from 'stream/consumers';

@Controller('transactions')
export class TransactionsEntriesController {
  constructor(
    private readonly transactionService: TransactionsEntriesService,
  ) {}

  @Get()
  async all(@Query('page') page = 1, @Query('take') take = 15) {
    return this.transactionService.allPaginated([], page, take);
  }

  @Get(':id')
  async find(@Param('id') id: number) {
    try {
      return this.transactionService.findOrFail({ id });
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Post()
  async create(@Body() body: TransactionCreateDto): Promise<Transaction> {
    return this.transactionService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: TransactionCreateDto) {
    try {
      return this.transactionService.update(id, body);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      return this.transactionService.delete(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
