export class SharenotesDto {
    readonly userId: string;
    readonly userName: string;
    readonly sharenoteCollectionName: string;
    readonly sharenoteCollectionNameVersion: string;
    readonly files: any[];
    readonly likeCount: number;
    readonly dowloadCount: number;
    readonly teachers: string[];
    readonly date: Date;
  }