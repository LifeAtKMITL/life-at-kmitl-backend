import { Facilities } from './../../db/facilities-schema';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DormFactory } from '../../dorm.factory';
import { CreateDormCommand } from './create-dorm.command';

@CommandHandler(CreateDormCommand)
export class CreateDormCommandHandler implements ICommandHandler {
  constructor(private readonly dormFactory: DormFactory) {}

  async execute({ createDormRequest }: CreateDormCommand): Promise<void> {
    const { name, tel, address, room, imagePath, zone, bills, facilities, rangePrice } = createDormRequest;

    const dorm = this.dormFactory.create({ name, tel, address, room, imagePath, zone, bills, facilities, rangePrice });
  }
}
