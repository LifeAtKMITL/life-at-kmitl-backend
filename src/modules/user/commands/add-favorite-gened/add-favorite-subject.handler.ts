import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GenEdRepository } from 'src/modules/subject/db/gened.repository';
import { UserEntityRepository } from 'src/modules/user/db/user-entity.repository';
import { AddFavoriteSubjectRequest } from '../../dtos/add-favorite-subject.dto';

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
    if (!addFavoriteSubjectRequest) {
      throw new BadRequestException('null error');
    }
    newUser.addFavoriteSubject(addFavoriteSubjectRequest);
    await this.userEntityRepository.findOneAndReplaceById(newUser.getUserId(), newUser);
  }
}
