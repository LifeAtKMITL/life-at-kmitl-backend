import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SubjectDtoRepository } from 'src/modules/subject/db/subject-dto.repository';
import { SubjectDto } from 'src/modules/subject/dtos/subject.dto';
import { UserEntityRepository } from '../db/user-entity.repository';
import { UserProfileSubjectDto } from '../dtos/response/user-profile-subject.dto';

export class GetUserProfileSubjectQuery {
  constructor(public readonly userId: string) {}
}

@QueryHandler(GetUserProfileSubjectQuery)
export class GetUserProfileSubjectQueryHandler implements IQueryHandler {
  constructor(
    private readonly userEntityRepository: UserEntityRepository,
    private readonly subjectDtoRepository: SubjectDtoRepository,
  ) {}

  async execute({ userId }: GetUserProfileSubjectQuery): Promise<UserProfileSubjectDto> {
    const user = await this.userEntityRepository.findOneById(userId);
    const favGenEds = user.getFavGenEd();
    const formattedFavGenEds: SubjectDto[] = [];

    for (let i = 0; i < favGenEds.length; i++) {
      const res = await this.subjectDtoRepository.findOneByIdAndSec(favGenEds[i].subjectId, favGenEds[i].sec);
      formattedFavGenEds.push(res);
    }

    return {
      userId: user.getUserId(),
      username: user.getUsername(),
      image: user.getImage(),
      favGenEd: formattedFavGenEds,
    };
  }
}
