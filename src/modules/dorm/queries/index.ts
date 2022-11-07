import { DormsByFilterOptionsQueryHandler } from './dorms-by-filterOptions.query-handler ';
import { DormByIdQueryHandler } from './dorm-by-id.query-handler';
import { DormsQueryHandler } from './dorms.query-handler';
import { DormReviewByIdQueryHandler } from './dormReviews/dormReview-by-id.query-handler';

export const DormQueryHandlers = [
  DormsQueryHandler,
  DormByIdQueryHandler,
  DormsByFilterOptionsQueryHandler,
  DormReviewByIdQueryHandler,
];
