import { SharenoteProfileQueryHandler } from './sharenote-profile-query';
import { SharenoteByIdQueryHandler } from './sharenoteById.handler';
import { SharenotesQueryHandler } from './sharenotes.handler';
export const SharenotesQueryhandlers = [
  SharenotesQueryHandler,
  SharenoteByIdQueryHandler,
  SharenoteProfileQueryHandler,
];
