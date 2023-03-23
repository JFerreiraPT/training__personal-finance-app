import { PaginatedResult } from './../interfaces/paginated-result.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

//E stans dor entity
//D stans for DTO used to create/ update
@Injectable()
export class BaseService<E> {
  constructor(protected readonly baseRepository: Repository<E>) {}

  async all(relations?: string[]): Promise<E[]> {
    return await this.baseRepository.find({ relations: relations });
  }

  async allPaginated(
    relations?: string[],
    page = 1,
    take = 15,
  ): Promise<PaginatedResult<E>> {
    const [data, total] = await this.baseRepository.findAndCount({
      take,
      skip: page - 1 * take,
      relations: relations,
    });

    return {
      data,
      meta: {
        page,
        last_page: Math.ceil(total / take),
        total,
      },
    };
  }

  async findOne(condition, relations?: string[]) {
    return this.baseRepository.findOne({
      where: condition,
      relations: relations,
    });
  }

  async findOrFail(condition, relations?: string[]) {
    const entity = await this.findOne(condition, relations);
    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }

  async create(data): Promise<E> {
    return this.baseRepository.save(data);
  }

  async update(id: number | string, data): Promise<E> {
    await this.baseRepository.update(id, data);

    return this.findOne({ id });
  }

  async delete(id: number | string): Promise<E> {
    const deletedEntity = await this.findOrFail({ id });

    this.baseRepository.delete(id);

    return deletedEntity;
  }
}
