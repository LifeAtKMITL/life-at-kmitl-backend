import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { EntityFactory } from 'src/ddd/EntityFactory';
import { SubjectEntityRepository } from './db/subject-entity.repository';
import { Subject } from './Subject';
import { SubjectProps } from './subject.types';

@Injectable()
export class SubjectFactory implements EntityFactory<Subject> {
  constructor(private readonly subjectEntityRepository: SubjectEntityRepository) {}

  async create({
    subjectId,
    name,
    classDateTime,
    midtermDateTime,
    finalDateTime,
    sec,
    credit,
    teachers,
  }: SubjectProps): Promise<Subject> {
    const newSubject = new Subject(
      new mongoose.Types.ObjectId().toHexString(),
      subjectId,
      name,
      classDateTime,
      midtermDateTime,
      finalDateTime,
      sec,
      credit,
      teachers,
    );
    await this.subjectEntityRepository.create(newSubject);
    return newSubject;
  }
}
