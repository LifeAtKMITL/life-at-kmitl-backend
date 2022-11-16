import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GenEdRepository } from '../db/gened.repository';
import { SubjectsDto } from '../dtos/subjects.dto';

export class AllGenEdQuery {}

@QueryHandler(AllGenEdQuery)
export class AllGenEdQueryHandler implements IQueryHandler {
  constructor(private readonly genedRepository: GenEdRepository) {}

  async execute(): Promise<SubjectsDto[]> {
    return await this.genedRepository.findAllQuery();
  }
}
