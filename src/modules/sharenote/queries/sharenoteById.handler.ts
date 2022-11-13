import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SharenoteDtoRepository } from '../db/sharenote-dto.repository';
import { SharenoteDto } from '../dtos/sharenote.dto';

export class SharenoteByIdQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(SharenoteByIdQuery)
export class SharenoteByIdQueryHandler implements IQueryHandler {
  constructor(private readonly sharenoteDtoRepository: SharenoteDtoRepository) {}

  async execute({ id }: SharenoteByIdQuery): Promise<SharenoteDto[]> {
    return this.sharenoteDtoRepository.findById(id);
  }
}
