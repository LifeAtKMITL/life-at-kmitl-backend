import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { EntityFactory } from 'src/ddd/EntityFactory';
import { BlogreviewEntityRepository } from './db/subject-entity.repository';
import { Blogreview } from './Blogreview';
import { BlogreviewProps } from './blogreview.types';

@Injectable()
export class SubjectFactory implements EntityFactory<Subject> {
  constructor(private readonly subjectEntityRepository: SubjectEntityRepository) {}

  async create({ name, sec, credit, teachers }: SubjectProps): Promise<Subject> {
    const newSubject = new Subject(new mongoose.Types.ObjectId().toHexString(), name, sec, credit, teachers);
    await this.subjectEntityRepository.create(newSubject);
    return newSubject;
  }
}
