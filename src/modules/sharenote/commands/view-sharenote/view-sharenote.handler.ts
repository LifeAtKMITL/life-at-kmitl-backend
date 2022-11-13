import { SharenoteEntityRepository } from '../../db/sharenote-entity.repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ViewSharenoteCommand } from './view-sharenote.command';

@CommandHandler(ViewSharenoteCommand)
export class ViewSharenoteCommandHandler implements ICommandHandler {
  constructor(private readonly sharenoteEntityRepository: SharenoteEntityRepository) {}

  async execute({ userId, likeSharenoteDto }: ViewSharenoteCommand): Promise<any> {
    const sharenote = await this.sharenoteEntityRepository.findOneById(likeSharenoteDto.sharenoteId);

    sharenote.addviewCount();

    await this.sharenoteEntityRepository.findOneAndReplaceById(sharenote.getId(), sharenote);

    return;
  }
}
