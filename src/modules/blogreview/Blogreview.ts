import { AggregateRoot } from '@nestjs/cqrs';

export class Blogreview extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly subjectId: string,
    private readonly textSubjectReview: string,
    private readonly userId: string,
    private readonly userName: string,
    private readonly userId_Liked: string[],
    private readonly rate: number,
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

  getTextSubjectReview(): string {
    return this.textSubjectReview;
  }

  getUserId(): string {
    return this.userId;
  }

  getUserName(): string {
    return this.userName;
  }
  getUserId_Liked(): string[] {
    return this.userId_Liked;
  }

  getRate(): number {
    return this.rate;
  }
  getDate(): Date {
    return this.date;
  }
}
