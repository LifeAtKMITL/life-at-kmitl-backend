import { Sharenote } from './../../Sharenote';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SharenoteFactory } from '../../sharenote.factory';
import { CreateSharenoteCommand } from './create-sharenote.command';

@CommandHandler(CreateSharenoteCommand)
export class CreateSharenoteCommandHandler implements ICommandHandler {
  constructor(private readonly sharenoteFactory: SharenoteFactory) {}

  async execute({ userId, createSharenoteRequest, listFileUploaded }: CreateSharenoteCommand): Promise<Sharenote> {
    const { subjectId, exam, year, description, sharenoteCollectionName, teachers ,subjectName} = createSharenoteRequest;
    const sharenote = this.sharenoteFactory.create(
      userId,
      subjectId,
      subjectName,
      sharenoteCollectionName,
      listFileUploaded[0].collectionName,
      listFileUploaded,
      teachers,
      exam,
      year,
      description,
    );
    return sharenote;
  }
}
