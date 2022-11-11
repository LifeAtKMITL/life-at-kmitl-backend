import { IsNotEmpty, IsNumberString, MinLength } from 'class-validator';

export class RemoveFavoriteSubjectRequest {
  @IsNotEmpty()
  @IsNumberString()
  @MinLength(8)
  subjectId: string;

  @IsNotEmpty()
  @IsNumberString()
  sec: string;
}
