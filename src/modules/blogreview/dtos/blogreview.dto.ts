import { ObjectId } from 'mongoose';

export class BlogreviewDto {
  readonly subjectId: string;
  readonly subjectName: string;
  readonly textSubjectReview: string;
  readonly userId: string;
  readonly userName: string;
  readonly likeCount: number;
  readonly date: Date;
}
