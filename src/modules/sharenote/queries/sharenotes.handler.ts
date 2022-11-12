import { SharenoteEntityRepository } from './../db/sharenote-entity.repository';
import { SharenoteDto } from '../dtos/sharenote.dto';
import { SharenoteDtoRepository } from './../db/sharenote-dto.repository';
import { SharenotesQuery } from './sharenotes.query';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { SharenotesDto } from '../dtos/sharenotes.dto';
import { Sharenote } from '../Sharenote';

@QueryHandler(SharenotesQuery)
export class SharenotesQueryHandler implements IQueryHandler<SharenotesQuery> {
  constructor(
    private readonly sharenoteDtoRepository: SharenoteDtoRepository,
    private readonly sharenoteRepository: SharenoteEntityRepository,
  ) {}

  async execute(): Promise<Sharenote[]> {
    return await this.sharenoteRepository.findAll();
  }
}
