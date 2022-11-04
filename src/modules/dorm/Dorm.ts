import { AggregateRoot } from '@nestjs/cqrs';

export class Dorm extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly name?: string,
    private readonly tel?: string,
    private readonly address?: string,
    private readonly room?: any[],
    private readonly imagePath?: string[],
    private readonly zone?: string[],
    private readonly bills?: any,
    private readonly facilities?: any,
    private readonly totalScore?: any[],
    private readonly rangePrice?: number[],
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
  getRoom(): any[] {
    return this.room;
  }

  getImagePath(): string[] {
    return this.imagePath;
  }

  getZone(): string[] {
    return this.zone;
  }
  getBills(): any {
    return this.bills;
  }
  getFacilities(): any {
    return this.facilities;
  }
  getTotalScore(): any[] {
    return this.totalScore;
  }

  getRangePrice(): number[] {
    return this.rangePrice;
  }
}
