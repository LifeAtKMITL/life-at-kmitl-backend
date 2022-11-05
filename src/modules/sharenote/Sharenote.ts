import { AggregateRoot } from '@nestjs/cqrs';

export class Sharenote extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly name: string,
    private readonly sec: string,
    private readonly credit: number,
    private readonly teachers: string[],
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  getName(): string {
    return this.name;
  }

  getSec(): string {
    return this.sec;
  }

  getCredit(): number {
    return this.credit;
  }

  getTeachers(): string[] {
    return this.teachers;
  }
}
