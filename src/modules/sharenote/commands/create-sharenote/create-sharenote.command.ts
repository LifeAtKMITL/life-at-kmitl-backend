import { CreateSharenoteRequestDTO } from '../../dtos/request/create-sharenote-request.dto';

export class CreateSharenoteCommand {
  constructor(
    public readonly createSharenoteRequest: CreateSharenoteRequestDTO,
    public readonly listFileUploaded: any,
  ) {}
}
  