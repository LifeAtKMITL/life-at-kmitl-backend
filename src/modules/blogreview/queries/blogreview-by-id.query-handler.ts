import { BlogreviewEntityRepository } from './../db/blogreview-entity.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BlogreviewDtoRepository } from '../db/blogreview-dto.repository';
import { BlogreviewDto } from '../dtos/blogreview.dto';

export class BlogreviewByIdQuery {
  constructor(public readonly userId: string) {}
}

@QueryHandler(BlogreviewByIdQuery)
export class BlogreviewByUserQueryHandler implements IQueryHandler {
  constructor(
    private readonly blogreviewDtoRepository: BlogreviewDtoRepository,
    private readonly blogreviewRepository: BlogreviewEntityRepository,
  ) {}

  async execute({ userId }: BlogreviewByIdQuery): Promise<BlogreviewDto> {
    return this.blogreviewRepository.findById(userId);
  }
}
