import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BlogreviewDtoRepository } from '../db/blogreview-dto.repository';
import { BlogreviewsDto } from '../dtos/blogreviews.dto';

export class BlogreviewsQuery {}

@QueryHandler(BlogreviewsQuery)
export class BlogreviewsQueryHandler implements IQueryHandler<BlogreviewsQuery> {
  constructor(private readonly blogreviewDtoRepository: BlogreviewDtoRepository) {}

  async execute(): Promise<any[]> {
    return this.blogreviewDtoRepository.findAll();
  }
}
