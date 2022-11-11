import { LikeBlogreviewDto } from '../../dtos/request/like-blogreview.dto';

export class LikeBlogreviewCommand {
  constructor(public readonly userId: string, public readonly likeBlogreviewDto: LikeBlogreviewDto) {}
}