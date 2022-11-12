export class SharenoteDto {
  readonly userId: string;
  readonly subjectId: string;
  readonly sharenoteCollectionName: string;
  readonly sharenoteCollectionNameVersion: string;
  readonly files: any[];
  readonly likeCount: number;
  readonly viewCount: number;
  readonly teachers: string[];
  readonly date: Date;
  readonly exam: string;
  readonly year: string;
  readonly description: string;
}
