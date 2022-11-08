import { SharenoteEntityRepository } from '../../db/sharenote-entity.repository';

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ViewSharenoteCommand } from './view-sharenote.command';
import { UserEntityRepository } from 'src/modules/user/db/user-entity.repository';

@CommandHandler(ViewSharenoteCommand)
export class ViewSharenoteCommandHandler implements ICommandHandler {
  constructor(private readonly sharenoteEntityRepository: SharenoteEntityRepository) {}

  async execute({ userId, likeSharenoteDto }: ViewSharenoteCommand): Promise<any> {
    const sharenote = await this.sharenoteEntityRepository.findOneById(likeSharenoteDto.sharenoteId);

    sharenote.addDowloadCount();

    await this.sharenoteEntityRepository.findOneAndReplaceById(sharenote.getId(), sharenote);

    return;
  }
}
