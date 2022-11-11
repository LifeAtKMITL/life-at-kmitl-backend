import { AggregateRoot } from '@nestjs/cqrs';

export class DormReview extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly dorm_Id: string,
    public readonly userId: string,
    private textReview: string,
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  getUserId(): string {
    return this.userId;
  }

  getDorm_Id(): string {
    return this.dorm_Id;
  }

  getTextReview(): string {
    return this.textReview;
  }
}
