import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SharenoteDtoRepository } from '../db/sharenote-dto.repository';
import { SharenoteDto } from '../dtos/sharenote.dto';

export class SharenoteByIdQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(SharenoteByIdQuery)
export class SubjectByIdQueryHandler implements IQueryHandler {
  constructor(private readonly subjectDtoRepository: SharenoteDtoRepository) {}

  async execute({ id }: SharenoteByIdQuery): Promise<SharenoteDto[]> {
    return this.subjectDtoRepository.findById(id);
  }
}
