import { SharenoteEntityRepository } from '../../db/sharenote-entity.repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ViewSharenoteCommand } from './view-sharenote.command';
import { Sharenote } from '../../Sharenote';
import { HttpException, HttpStatus } from '@nestjs/common';

@CommandHandler(ViewSharenoteCommand)
export class ViewSharenoteCommandHandler implements ICommandHandler {
  constructor(private readonly sharenoteEntityRepository: SharenoteEntityRepository) {}

  async execute({ userId, likeSharenoteDto }: ViewSharenoteCommand): Promise<any> {
    let sharenote: Sharenote;
    try {
      sharenote = await this.sharenoteEntityRepository.findOneById(likeSharenoteDto.sharenoteId);
    } catch (e) {
      return new HttpException('NOT FOUND Sharenote', HttpStatus.NOT_FOUND);
    }

    sharenote.addviewCount();

    await this.sharenoteEntityRepository.findOneAndReplaceById(sharenote.getId(), sharenote);

    return sharenote;
  }
}
