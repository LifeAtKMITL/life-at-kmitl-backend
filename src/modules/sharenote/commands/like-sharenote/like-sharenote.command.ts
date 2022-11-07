import { LikeSharenoteDto } from './../../dtos/likeSharenote/likeSharenote.dto';

export class LikeSharenoteCommand {
  constructor(public readonly userId: string, public readonly likeSharenoteDto: LikeSharenoteDto) {}
}
