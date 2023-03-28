import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsIn } from 'class-validator';

enum Types {
  EXPENSE = 'expense',
  REVENUE = 'revenue',
}

export class TransactionCreateDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsIn(['expense', 'revenue'])
  type: Types;

  @IsNotEmpty()
  @ApiProperty()
  category: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @ApiProperty()
  source: string;

  @IsNotEmpty()
  @ApiProperty()
  amount: number;

  note: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsDateString()
  date: Date;
}
