import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('expenses_schedule')
export class ExpensesSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  date: Date;

  @Column({ type: 'double' })
  amount: number;

  @Column({ default: false })
  isPaid: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
