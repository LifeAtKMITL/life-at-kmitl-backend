import { SharenoteEntityRepository } from './../db/sharenote-entity.repository';
import { SharenoteDto } from '../dtos/sharenote.dto';
import { SharenoteDtoRepository } from './../db/sharenote-dto.repository';
import { SharenotesQuery } from './sharenotes.query';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Sharenote } from '../Sharenote';
import { UserEntityRepository } from 'src/modules/user/db/user-entity.repository';
import { GetAllSharenoteDto } from '../dtos/getAll Sharenote/getall-sharenote.dto';

@QueryHandler(SharenotesQuery)
export class SharenotesQueryHandler implements IQueryHandler<SharenotesQuery> {
  constructor(
    private readonly sharenoteRepository: SharenoteEntityRepository,
    private readonly userRepository: UserEntityRepository,
  ) {}

  async execute(): Promise<GetAllSharenoteDto[]> {
    const sharenotes = await this.sharenoteRepository.findAll();
    const res = [];
    for (let i = 0; i < sharenotes.length; i++) {
      const user = await this.userRepository.findOneById(sharenotes[i].getUserId());
      const temp = {
        username: user.getUsername(),
        image: user.getImage(),
        sharenote: sharenotes[i],
      };
      res.push(temp);
    }
    return res;
  }
}
