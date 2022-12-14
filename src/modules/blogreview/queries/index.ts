import { BlogreviewByUserQueryHandler } from './blogreview-by-id.query-handler';
import { BlogreviewsQueryHandler } from './blogreview.query-handler';
import { GetBookmarkedReviewQueryHandler } from './bookmarked-blogreview-query-handler';
import { UserBlogreviewQueryHandler } from './user-blogreview-query-handler';

export const BlogreviewQueryHandlers = [
  BlogreviewsQueryHandler,
  BlogreviewByUserQueryHandler,
  GetBookmarkedReviewQueryHandler,
  UserBlogreviewQueryHandler
];
