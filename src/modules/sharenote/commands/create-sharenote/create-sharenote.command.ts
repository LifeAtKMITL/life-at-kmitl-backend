import { CreateSharenoteRequest } from '../../dtos/request/create-sharenote-request.dto';

export class CreateSharenoteCommand {
  constructor(public readonly createSharenoteRequest: CreateSharenoteRequest) {}
}
