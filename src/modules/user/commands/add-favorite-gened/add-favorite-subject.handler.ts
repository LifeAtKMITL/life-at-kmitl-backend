import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GenEdRepository } from 'src/modules/subject/db/gened.repository';
import { UserEntityRepository } from 'src/modules/user/db/user-entity.repository';
import { AddFavoriteSubjectRequest } from '../../dtos/request/add-favorite-subject.dto';

export class AddFavoriteSubjectCommand {
  constructor(public readonly userId: string, public readonly addFavoriteSubjectRequest: AddFavoriteSubjectRequest) {}
}

@CommandHandler(AddFavoriteSubjectCommand)
export class AddFavoriteSubjectCommandHandler implements ICommandHandler {
  constructor(
    private readonly userEntityRepository: UserEntityRepository,
    private readonly genedRepository: GenEdRepository,
  ) {}

  async execute({ userId, addFavoriteSubjectRequest }: AddFavoriteSubjectCommand): Promise<any> {
    const newUser = await this.userEntityRepository.findOneById(userId);
    const { subjectId, sec } = addFavoriteSubjectRequest;
    // check if the subject are exist
    await this.genedRepository.findByIdAndSec(subjectId, sec);
    newUser.addFavoriteSubject(addFavoriteSubjectRequest);
    await this.userEntityRepository.findOneAndReplaceById(newUser.getUserId(), newUser);
  }
}
