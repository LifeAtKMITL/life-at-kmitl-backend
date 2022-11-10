import { UserEntityRepository } from 'src/modules/user/db/user-entity.repository';
import { Blogreview } from './../Blogreview';
import { BlogreviewEntityRepository } from './../db/blogreview-entity.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BlogreviewDtoRepository } from '../db/blogreview-dto.repository';
import { BlogreviewDto } from '../dtos/blogreview.dto';

export class BlogreviewByIdQuery {
  constructor(public readonly userId: string) {}
}

@QueryHandler(BlogreviewByIdQuery)
export class BlogreviewByUserQueryHandler implements IQueryHandler {
  constructor(
    private readonly userRepository: UserEntityRepository,

    private readonly blogreviewRepository: BlogreviewEntityRepository,
  ) {}

  async execute({ userId }: BlogreviewByIdQuery): Promise<any[]> {
    const blogreviews = await this.blogreviewRepository.findByUserId(userId);
    const user = await this.userRepository.findOneById(userId);
    //console.log(user);

    return blogreviews.map((blogreview) => {
      const temp = {
        _id: blogreview.getId(),
        subjectId: blogreview.getSubjectId(),
        subjectName: blogreview.getSubjectName(),
        textSubjectReview: blogreview.getTextSubjectReview(),
        userId: blogreview.getUserId(),
        likeCount: blogreview.getLikeCount(),
        date: blogreview.getDate(),
        username: user.getUsername(),
        imagePath: user.getImage(),
      };
      return temp;
    });
  }
}
