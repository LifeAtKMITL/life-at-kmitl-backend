import { AggregateRoot } from '@nestjs/cqrs';

export class Dorm extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly name?: string,
    private readonly tel?: string,
    private readonly address?: string,
    private readonly room?: Object[],
    private readonly imagePath?: string[],
    private readonly zone?: string,
    private readonly bills?: Object,
    private readonly facilities?: Object,
    private readonly totalScore?: Object[],
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  getName(): string {
    return this.name;
  }

  getTel(): string {
    return this.tel;
  }

  getAddress(): string {
    return this.address;
  }
  getRoom(): Object[] {
    return this.room;
  }

  getImagePath(): string[] {
    return this.imagePath;
  }

  getZone(): string {
    return this.zone;
  }
  getBills(): Object {
    return this.bills;
  }
  getFacilities(): Object {
    return this.facilities;
  }
  getTotalScore(): Object[] {
    return this.totalScore;
  }
}
