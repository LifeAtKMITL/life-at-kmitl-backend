import { SubjectDto } from 'src/modules/subject/dtos/subject.dto';

export class UserProfileSubjectDto {
  userId: string;
  username: string;
  image: string;
  favGenEd: SubjectDto[];
}
