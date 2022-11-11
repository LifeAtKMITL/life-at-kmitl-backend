import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GenEdRepository } from 'src/modules/subject/db/gened.repository';
import { UserEntityRepository } from '../../db/user-entity.repository';
import { RemoveFavoriteSubjectRequest } from '../../dtos/request/remove-favorite-subject.dto';

export class RemoveFavoriteSubjectCommand {
  constructor(
    public readonly userId: string,
    public readonly removeFavoriteSubjectRequest: RemoveFavoriteSubjectRequest,
  ) {}
}

@CommandHandler(RemoveFavoriteSubjectCommand)
export class RemoveFavoriteSubjectCommandHandler implements ICommandHandler {
  constructor(
    private readonly userEntityRepository: UserEntityRepository,
    private readonly genedRepository: GenEdRepository,
  ) {}

  async execute({ userId, removeFavoriteSubjectRequest }: RemoveFavoriteSubjectCommand): Promise<any> {
    const newUser = await this.userEntityRepository.findOneById(userId);
    const { subjectId, sec } = removeFavoriteSubjectRequest;
    // check if the subject are exist
    await this.genedRepository.findByIdAndSec(subjectId, sec);
    newUser.removeFavoriteSubject(removeFavoriteSubjectRequest);
    await this.userEntityRepository.findOneAndReplaceById(newUser.getUserId(), newUser);
    return;
  }
}
