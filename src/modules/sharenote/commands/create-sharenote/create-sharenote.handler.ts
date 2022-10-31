import { Sharenote } from './../../Sharenote';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SharenoteFactory } from '../../sharenote.factory';
import { CreateSharenoteCommand } from './create-sharenote.command';

@CommandHandler(CreateSharenoteCommand)
export class CreateSharenoteCommandHandler implements ICommandHandler {
  constructor(private readonly sharenoteFactory: SharenoteFactory) {}

  async execute({ createSharenoteRequest, listFileUploaded }: CreateSharenoteCommand): Promise<Sharenote> {
    const { _id_mongo_user, sharenoteCollectionName, teachers } = createSharenoteRequest;
    // console.log(_id_mongo_user);
    // console.log(sharenoteCollectionName);
    //console.log(listFileUploaded[0].collectionName);
    const sharenote = this.sharenoteFactory.create(
      _id_mongo_user,
      'USERNAME PLACE HERE',
      sharenoteCollectionName,
      listFileUploaded[0].collectionName,
      listFileUploaded,
      teachers,
    );
    return sharenote;
  }
}
