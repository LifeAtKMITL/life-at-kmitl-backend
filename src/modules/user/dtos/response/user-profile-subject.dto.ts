import { FavoriteGenEd } from '../../value-objects';

export class UserProfileSubjectDto {
  userId: string;
  username: string;
  image: string;
  favGenEd: FavoriteGenEd[];
}
