export class CreateSharenoteRequestDTO {
  _id_mongo_user: string;
  sharenoteCollectionName: string;
  teachers: string[];
  userId: string;
  userName: string;
  // sharenoteCollectionName: string;
  sharenoteCollectionNameVersion: string;
  files: any[];
  likeCount: number;
  dowloadCount: number;
  // teachers: string[];
  date: Date;
}
