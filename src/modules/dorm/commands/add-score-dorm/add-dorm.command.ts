import { AddScoreDto } from './../../dtos/command/add-score-dorm.dto';

export class AddScoreDormCommand {
  constructor(public readonly userId: string, public readonly addScoreDto: AddScoreDto) {}
}
