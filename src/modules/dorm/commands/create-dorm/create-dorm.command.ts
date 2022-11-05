import { CreateDormRequest } from '../../dtos/request/create-dorm-request.dto';

export class CreateDormCommand {
  constructor(public readonly createDormRequest: CreateDormRequest) {}
}
