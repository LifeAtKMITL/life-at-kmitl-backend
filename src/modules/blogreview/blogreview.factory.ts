import { SubjectDtoRepository } from './../subject/db/subject-dto.repository';
import { GenEdRepository } from './../subject/db/gened.repository';
import { SubjectEntityRepository } from './../subject/db/subject-entity.repository';
import { UserEntityRepository } from 'src/modules/user/db/user-entity.repository';
import { CreateBlogreviewRequest } from './dtos/request/create-blog-request.dto';
import { Injectable, HttpStatus } from '@nestjs/common';
import mongoose from 'mongoose';
import { EntityFactory } from 'src/ddd/EntityFactory';
import { BlogreviewEntityRepository } from './db/blogreview-entity.repository';
import { Blogreview } from './Blogreview';
import { BlogreviewProps } from './blogreview.types';

@Injectable()
export class BlogreviewFactory implements EntityFactory<Blogreview> {
  constructor(
    private readonly blogreviewEntityRepository: BlogreviewEntityRepository,
    private readonly userEntityRepository: UserEntityRepository,
    private readonly subjectEntityRepository: SubjectEntityRepository,
    private readonly subjectDtoEntityRepository: SubjectDtoRepository,

    private readonly genEdEntityRepository: GenEdRepository,
  ) {}

  async create(userId: string, subjectId: string, textSubjectReview: string): Promise<Blogreview> {
    let subject;
    try {
      subject = await this.subjectEntityRepository.findOneBySubjectId(subjectId);
    } catch (e) {
      try {
        subject = await this.genEdEntityRepository.findOneBySubjectId(subjectId);
      } catch (e) {
        return;
      }
    }

    const newBlogreview = new Blogreview(
      new mongoose.Types.ObjectId().toHexString(),
      subject.getSubjectId(),
      subject.getName(),
      textSubjectReview,
      userId,
      0,
      new Date(),
    );
    await this.blogreviewEntityRepository.create(newBlogreview);
    return newBlogreview;
  }
}
