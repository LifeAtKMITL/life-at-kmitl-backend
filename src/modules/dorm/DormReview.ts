import { AggregateRoot } from '@nestjs/cqrs';

export class DormReview extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly dorm_Id: string,
    private userId: string,
    private textReview: string,
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  getuserId(): string {
    return this.userId;
  }

  getDorm_Id(): string {
    return this.dorm_Id;
  }

  getTextReview(): string {
    return this.textReview;
  }
}
