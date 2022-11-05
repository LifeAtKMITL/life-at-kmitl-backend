import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UploadFilesharenoteCommand } from './uploadFile-sharenote.command';

@CommandHandler(UploadFilesharenoteCommand)
export class CreateSharenoteCommandHandler implements ICommandHandler {
  constructor() {}

  async execute({}: UploadFilesharenoteCommand): Promise<void> {}
}
