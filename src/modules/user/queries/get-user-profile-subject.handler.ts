import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserEntityRepository } from '../db/user-entity.repository';
import { UserProfileSubjectDto } from '../dtos/response/user-profile-subject.dto';

export class GetUserProfileSubjectQuery {
  constructor(public readonly userId: string) {}
}

@QueryHandler(GetUserProfileSubjectQuery)
export class GetUserProfileSubjectQueryHandler implements IQueryHandler {
  constructor(private readonly userEntityRepository: UserEntityRepository) {}

  async execute({ userId }: GetUserProfileSubjectQuery): Promise<UserProfileSubjectDto> {
    const user = await this.userEntityRepository.findOneById(userId);
    return {
      userId: user.getUserId(),
      username: user.getUsername(),
      image: user.getImage(),
      favGenEd: user.getFavGenEd(),
    };
  }
}
