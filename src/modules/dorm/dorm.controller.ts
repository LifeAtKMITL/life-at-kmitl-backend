import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateDormCommand } from './commands/create-dorm/create-dorm.command';
import { CreateDormRequest } from './dtos/request/create-dorm-request.dto';

@Controller('dorm')
export class DormController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get()
  async getAll() {
    return 'hellop';
  }

  @Post()
  async createDorm(@Body() createDormRequest: CreateDormRequest): Promise<void> {
    await this.commandBus.execute<CreateDormCommand, void>(new CreateDormCommand(createDormRequest));
  }
}
