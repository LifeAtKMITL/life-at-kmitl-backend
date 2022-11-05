import { DormsByFilterOptionsQuery } from './queries/dorms-by-filterOptions.query-handler ';
import { FilterOptionsDto } from './dtos/request/filterOptions-query';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateDormCommand } from './commands/create-dorm/create-dorm.command';
import { CreateDormRequest } from './dtos/request/create-dorm-request.dto';
import { DormsQuery } from './queries/dorms.query-handler';
import { DormByIdQuery } from './queries/dorm-by-id.query-handler';
import { DormsDto } from './dtos/request/dorms.dto';

@Controller('dorm')
export class DormController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get()
  async getAllDorms(): Promise<any> {
    return await this.queryBus.execute<DormsQuery, any>(new DormsQuery());
  }

  @Get('filter')
  // TODO: Please fix <any> to some type (interface or class will do!)
  async getDormByFilterOptions(@Body() filterOptionsDto: FilterOptionsDto): Promise<any> {
    return await this.queryBus.execute<DormsByFilterOptionsQuery, any>(new DormsByFilterOptionsQuery(filterOptionsDto));
  }

  @Get(':id')
  async getDormById(@Param('id') id: string): Promise<DormsDto> {
    return this.queryBus.execute<DormByIdQuery, any>(new DormByIdQuery(id));
  }

  @Post()
  async createDorm(@Body() createDormRequest: CreateDormRequest): Promise<void> {
    await this.commandBus.execute<CreateDormCommand, void>(new CreateDormCommand(createDormRequest));
  }
}
