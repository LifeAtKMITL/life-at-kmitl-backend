import { CreateBlogreviewRequest } from '../../dtos/request/create-blog-request.dto';

export class CreateBlogCommand {
  constructor(public readonly userId: string, public readonly createBlogreviewRequest: CreateBlogreviewRequest) {}
}
