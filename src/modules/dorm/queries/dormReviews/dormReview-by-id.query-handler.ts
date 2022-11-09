import { UserEntityRepository } from 'src/modules/user/db/user-entity.repository';
import { DormReviewEntityRepository } from './../../db/dormReview-entity.repository';

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DormEntityRepository } from '../../db/dorm-entity.repository';

export class DormReviewByIdQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(DormReviewByIdQuery)
export class DormReviewByIdQueryHandler implements IQueryHandler {
  constructor(
    private readonly dormReviewRepository: DormReviewEntityRepository,
    private readonly dormRepository: DormEntityRepository,
    private readonly userRepository: UserEntityRepository,
  ) {}

  async execute({ id }: DormReviewByIdQuery): Promise<any[]> {
    //const dorm = await this.dormRepository.findOneById(id);
    const reviews = await this.dormReviewRepository.findAllById(id);
    if (reviews.length == 0) {
      return reviews;
    }
    const user = await this.userRepository.findOneById(reviews[0].userId);
    //console.log(user);
    const temp = {
      username: user.getUsername(),
      image: user.getImage(),
      ...reviews,
    };
    return temp;
    // return this.dormDtoRepository.findById(id);
  }
}
