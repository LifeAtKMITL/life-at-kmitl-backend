import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DormFactory } from '../../dorm.factory';
import { CreateDormCommand } from './create-dorm.command';

@CommandHandler(CreateDormCommand)
export class CreateDormCommandHandler implements ICommandHandler {
  constructor(private readonly dormFactory: DormFactory) {}

  async execute({ createDormRequest }: CreateDormCommand): Promise<void> {
    const { name, description } = createDormRequest;
    const dorm = this.dormFactory.create({ name, description });
  }
}
