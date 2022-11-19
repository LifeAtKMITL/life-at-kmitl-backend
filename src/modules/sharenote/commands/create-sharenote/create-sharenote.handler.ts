import { Sharenote } from './../../Sharenote';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SharenoteFactory } from '../../sharenote.factory';
import { CreateSharenoteCommand } from './create-sharenote.command';
import { FileService } from 'src/firebase/services/file.service';

@CommandHandler(CreateSharenoteCommand)
export class CreateSharenoteCommandHandler implements ICommandHandler {
  constructor(private readonly sharenoteFactory: SharenoteFactory, private readonly fileService: FileService) {}

  async execute({ userId, createSharenoteRequest, listObjFile }: CreateSharenoteCommand): Promise<Sharenote> {
    const { subjectId, exam, year, description, sharenoteCollectionName, teachers, subjectName } =
      createSharenoteRequest;

    const listFileUploaded = await this.fileService.uploadsParams(listObjFile, userId, sharenoteCollectionName);

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
