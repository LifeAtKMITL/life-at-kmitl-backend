import { CreateSubjectRequest } from '../../dtos/request/create-subject-request.dto';

export class CreateSubjectCommand {
  constructor(public readonly createSubjectRequest: CreateSubjectRequest) {}
}
