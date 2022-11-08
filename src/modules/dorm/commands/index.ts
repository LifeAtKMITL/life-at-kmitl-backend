import { CreateDormReviewCommandHandler } from './create-dormReview/create-dormReview.handler';
import { AddScoreDormCommandHandler } from './add-score-dorm/add-dorm.handler';
import { CreateDormCommandHandler } from './create-dorm/create-dorm.handler';

export const DormCommandHandlers = [
  CreateDormCommandHandler,
  AddScoreDormCommandHandler,
  CreateDormReviewCommandHandler,
];
