export class CreateSharenoteRequestDTO {
  _id_mongo_user: string;
  sharenoteCollectionName: string;
  teachers: string[];
  userId: string;
  subjectId: string;
  sharenoteCollectionNameVersion: string;
  files: any[];
  likeCount: number;
  viewCount: number;
  date: Date;
  exam: string;
  year: string;
  description: string;
}
