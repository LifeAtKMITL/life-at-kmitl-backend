import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BlogreviewDtoRepository } from '../db/blogreview-dto.repository';
import { BlogreviewDto } from '../dtos/blogreview.dto';

export class BlogreviewByUserQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(BlogreviewByUserQuery)
export class BlogreviewByUserQueryHandler implements IQueryHandler {
  constructor(private readonly blogreviewDtoRepository: BlogreviewDtoRepository) {}

  async execute({ id }: BlogreviewByUserQuery): Promise<BlogreviewDto> {
    return this.blogreviewDtoRepository.findById(id);
  }
}
