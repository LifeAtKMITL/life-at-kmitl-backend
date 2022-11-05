import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserEntityRepository } from '../db/user-entity.repository';

export class GetUserByIdQuery {
  constructor(private readonly userId: string) {}

  getUserId(): string {
    return this.userId;
  }
}

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler implements IQueryHandler {
  constructor(private readonly userEntityRepository: UserEntityRepository) {}

  async execute(getUserByIdQuery: GetUserByIdQuery): Promise<any> {
    return this.userEntityRepository.findOneById(getUserByIdQuery.getUserId());
  }
}
