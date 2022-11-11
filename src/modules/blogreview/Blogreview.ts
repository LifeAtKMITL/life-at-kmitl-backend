import { AggregateRoot } from '@nestjs/cqrs';

export class Blogreview extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly subjectId: string,
    private readonly subjectName: string,
    private readonly textSubjectReview: string,
    private readonly userId: string,
    private likeCount: number,
    private readonly date: Date,
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }
  getSubjectId(): string {
    return this.subjectId;
  }
  getSubjectName(): string {
    return this.subjectName;
  }

  getTextSubjectReview(): string {
    return this.textSubjectReview;
  }
  getUserId(): string {
    return this.userId;
  }

  getLikeCount(): number {
    return this.likeCount;
  }

  getDate(): Date {
    return this.date;
  }

  addLikeCount(): any {
    this.likeCount = this.getLikeCount() + 1;
  }

  minusLikeCount(): any {
    if (this.likeCount > 0) {
      this.likeCount = this.getLikeCount() - 1;
    }
  }
}
