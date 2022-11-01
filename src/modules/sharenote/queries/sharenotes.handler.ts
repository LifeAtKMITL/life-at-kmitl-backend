import { SharenoteDto } from '../dtos/sharenote.dto';
import { SharenoteDtoRepository } from './../db/sharenote-dto.repository';
import { SharenotesQuery } from './sharenotes.query';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { SharenotesDto } from '../dtos/sharenotes.dto';

@QueryHandler(SharenotesQuery)
export class SharenotesQueryHandler implements IQueryHandler<SharenotesQuery> {
  constructor(private readonly sharenoteDtoRepository: SharenoteDtoRepository) {}
  async execute(): Promise<SharenotesDto[]> {
    return this.sharenoteDtoRepository.findAll();
  }
}
