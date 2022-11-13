import { CreateBlogreviewCommandHandler } from './create-blogreview/create-blogreview.handler';
import { AddBookmarkBlogreviewCommandHandler } from './add-bookmark-blogreview/add-bookmark-blogreview.handler';
import { LikeBlogreviewCommandHandler } from './like-blogreview/like-blogreview.handler';
import { RemoveBookmarkedReviewCommandHandler } from './remove-bookmark-blogreview/remove-bookmark-blogreview.handler';

export const BlogreviewCommandHandlers = [
  CreateBlogreviewCommandHandler,
  AddBookmarkBlogreviewCommandHandler,
  LikeBlogreviewCommandHandler,
  RemoveBookmarkedReviewCommandHandler
];
