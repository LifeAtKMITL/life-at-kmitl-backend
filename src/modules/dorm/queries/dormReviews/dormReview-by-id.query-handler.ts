import { UserEntityRepository } from 'src/modules/user/db/user-entity.repository';
import { DormReviewEntityRepository } from '../../db/dormReview-entity.repository';

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DormEntityRepository } from '../../db/dorm-entity.repository';
import { User } from 'src/modules/user/User';

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

    const listResponse = [];
    const listhave = new Set<string>();
    const listUser: User[] = [];
    for (let i = 0; i < reviews.length; i++) {
      if (listhave.has(reviews[i].getUserId()) == false) {
        listhave.add(reviews[i].getUserId());

        listUser.push(await this.userRepository.findOneById(reviews[i].getUserId()));
      }

      const templisthave = [...listhave];
      const indexHave = templisthave.indexOf(reviews[i].getUserId());

      const temp = {
        ...reviews[i],
        username: listUser[indexHave].getUsername(),
        imagePath: listUser[indexHave].getImage(),
      };
      listResponse.push(temp);
    }
    return listResponse;
  }
}
