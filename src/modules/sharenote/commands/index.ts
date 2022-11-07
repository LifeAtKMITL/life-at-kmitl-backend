import { CreateSharenoteCommandHandler } from './create-sharenote/create-sharenote.handler';
import { LikeSharenoteCommandHandler } from './like-sharenote/like-sharenote.handler';

export const SharenoteCommandHandlers = [CreateSharenoteCommandHandler, LikeSharenoteCommandHandler];
