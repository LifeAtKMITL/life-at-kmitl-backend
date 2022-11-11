import { IsNotEmpty, IsNumberString, MinLength } from 'class-validator';

export class AddFavoriteSubjectRequest {
  @IsNotEmpty()
  @IsNumberString()
  @MinLength(8)
  subjectId: string;

  @IsNotEmpty()
  @IsNumberString()
  sec: string;
}
