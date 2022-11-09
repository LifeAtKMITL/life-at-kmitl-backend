import { DormEntityRepository } from './../../db/dorm-entity.repository';
import { UserEntityRepository } from 'src/modules/user/db/user-entity.repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DormFactory } from '../../dorm.factory';
import { AddScoreDormCommand } from './add-dorm.command';

@CommandHandler(AddScoreDormCommand)
export class AddScoreDormCommandHandler implements ICommandHandler {
  constructor(
    private readonly userEntityRepository: UserEntityRepository,
    private readonly dormEntityRepository: DormEntityRepository,
  ) {}

  async execute(addScoreDormCommand: AddScoreDormCommand): Promise<any> {
    const { userId, addScoreDto } = addScoreDormCommand;

    const dorm = await this.dormEntityRepository.findOneById(addScoreDto.dormId);
    dorm.setTotalScore(userId, addScoreDto.score);
    await this.dormEntityRepository.findOneAndReplaceById(dorm.getId(), dorm);
  }
}
