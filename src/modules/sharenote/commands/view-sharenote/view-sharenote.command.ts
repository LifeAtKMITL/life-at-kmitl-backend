import { LikeSharenoteDto } from '../../dtos/likeSharenote/likeSharenote.dto';

export class ViewSharenoteCommand {
  constructor(public readonly userId: string, public readonly likeSharenoteDto: LikeSharenoteDto) {}
}
