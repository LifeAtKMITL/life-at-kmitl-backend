import { User } from './../../user/User';
import { Blogreview } from './../Blogreview';
import { UserEntityRepository } from 'src/modules/user/db/user-entity.repository';
import { BlogreviewEntityRepository } from './../db/blogreview-entity.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BlogreviewDtoRepository } from '../db/blogreview-dto.repository';
import { BlogreviewsDto } from '../dtos/blogreviews.dto';

export class BlogreviewsQuery {}

@QueryHandler(BlogreviewsQuery)
export class BlogreviewsQueryHandler implements IQueryHandler<BlogreviewsQuery> {
  constructor(
    private readonly blogreviewDtoRepository: BlogreviewDtoRepository,
    private readonly blogreviewRepository: BlogreviewEntityRepository,
    private readonly userRepository: UserEntityRepository,
  ) {}

  async execute(): Promise<any[]> {
    const blogreviews = await this.blogreviewRepository.findAll();
    //console.log(blogreviews);
    if (blogreviews.length == 0) {
      return blogreviews;
    }
    const listResponse = [];
    const listhave = new Set<string>();
    const listUser: User[] = [];
    for (let i = 0; i < blogreviews.length; i++) {
      //console.log(listhave.has(blogreviews[i].getUserId()));
      if (listhave.has(blogreviews[i].getUserId()) == false) {
        listhave.add(blogreviews[i].getUserId());
        listUser.push(await this.userRepository.findOneById(blogreviews[i].getUserId()));
      }
      const templisthave = [...listhave];
      const indexHave = templisthave.indexOf(blogreviews[i].getUserId());
      //console.log(indexHave);

      const temp = {
        _id: blogreviews[i].getId(),
        subjectId: blogreviews[i].getSubjectId(),
        subjectName: blogreviews[i].getSubjectName(),
        textSubjectReview: blogreviews[i].getTextSubjectReview(),
        userId: blogreviews[i].getUserId(),
        likeCount: blogreviews[i].getLikeCount(),
        date: blogreviews[i].getDate(),
        username: listUser[indexHave].getUsername(),
        imagePath: listUser[indexHave].getImage(),
      };
      //console.log(temp);
      listResponse.push(temp);
    }
    return listResponse;
  }
}
