import { AggregateRoot } from '@nestjs/cqrs';

export class Sharenote extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly userId: string,
    private readonly userName: string,
    private readonly sharenoteCollectionName: string,
    private readonly sharenoteCollectionNameVersion: string,
    private readonly files: any[],
    private readonly likeCount: number,
    private readonly dowloadCount: number,
    private readonly teachers: string[],
    private readonly date: Date,
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  getUserId(): string {
    return this.userId;
  }
  getUserName(): string {
    return this.userName;
  }

  getSharenoteCollectionName(): string {
    return this.sharenoteCollectionName;
  }
  getSharenoteCollectionNameVersion(): string {
    return this.sharenoteCollectionNameVersion;
  }

  getFiles(): any[] {
    return this.files;
  }

  getLikeCount(): number {
    return this.likeCount;
  }

  getDowloadCount(): number {
    return this.dowloadCount;
  }

  getTeachers(): string[] {
    return this.teachers;
  }

  getDate(): Date {
    return this.date;
  }
}
