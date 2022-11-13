import { SharenoteEntityRepository } from './../db/sharenote-entity.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class SharenoteProfileQuery {
  constructor(public readonly userId: string) {}
}

@QueryHandler(SharenoteProfileQuery)
export class SharenoteProfileQueryHandler implements IQueryHandler {
  constructor(private readonly sharenoteRepository: SharenoteEntityRepository) {}

  async execute({ userId }: SharenoteProfileQuery): Promise<any> {
    console.log('DOG');
    const sharenote = this.sharenoteRepository.findById(userId);
    console.log(sharenote);
    return sharenote;
  }
}
