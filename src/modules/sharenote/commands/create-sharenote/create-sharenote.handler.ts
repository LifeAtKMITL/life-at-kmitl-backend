import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SharenoteFactory } from '../../sharenote.factory';
import { CreateSharenoteCommand } from './create-sharenote.command';

@CommandHandler(CreateSharenoteCommand)
export class CreateSharenoteCommandHandler implements ICommandHandler {
  constructor(private readonly sharenoteFactory: SharenoteFactory) {}

  async execute({ createSharenoteRequest }: CreateSharenoteCommand): Promise<void> {
    const { userId, userName, sharenoteCollectionName, pathFiles, likeCount, dowloadCount, teachers, date } =
      createSharenoteRequest;
    const sharenote = this.sharenoteFactory.create({
      userId,
      userName,
      sharenoteCollectionName,
      pathFiles,
      likeCount,
      dowloadCount,
      teachers,
      date,
    });
  }
}
