import { BlogreviewEntityRepository } from './../db/blogreview-entity.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BlogreviewDtoRepository } from '../db/blogreview-dto.repository';
import { BlogreviewDto } from '../dtos/blogreview.dto';

export class BlogreviewByUserQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(BlogreviewByUserQuery)
export class BlogreviewByUserQueryHandler implements IQueryHandler {
  constructor(
    private readonly blogreviewDtoRepository: BlogreviewDtoRepository,
    private readonly blogreviewRepository: BlogreviewEntityRepository,
  ) {}

  async execute({ id }: BlogreviewByUserQuery): Promise<any> {
    return this.blogreviewRepository.findOneById(id);
  }
}
