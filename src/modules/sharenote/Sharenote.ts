import { AggregateRoot } from '@nestjs/cqrs';

export class Sharenote extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly userId: string,
    private readonly subjectId: string,
    private readonly subjectName: string,
    private readonly sharenoteCollectionName: string,
    private readonly sharenoteCollectionNameVersion: string,
    private readonly files: any[],
    private likeCount: number,
    private viewCount: number,
    private readonly teachers: string[],
    private readonly date: Date,
    private readonly description: string,
    private readonly exam: string,
    private readonly year: string,
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  getUserId(): string {
    return this.userId;
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

  public getViewCount(): number {
    return this.viewCount;
  }

  getTeachers(): string[] {
    return this.teachers;
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
  addviewCount(): any {
    this.viewCount = this.getViewCount() + 1;
  }

  getSubjectId(): string {
    return this.subjectId;
  }
  getSubjectName(): string {
    return this.subjectName;
  }

  getDescription(): string {
    return this.description;
  }
  getExam(): string {
    return this.exam;
  }
  getYear(): string {
    return this.year;
  }
}
