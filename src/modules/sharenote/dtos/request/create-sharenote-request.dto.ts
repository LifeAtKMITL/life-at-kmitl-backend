export class CreateSharenoteRequest {
  userId: string;
  userName: string;
  sharenoteCollectionName: string;
  pathFiles: string[];
  likeCount: number;
  dowloadCount: number;
  teachers: string[];
  date: Date;
}
