import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { EntityFactory } from 'src/ddd/EntityFactory';
import { Subject } from './Subject';
import { SubjectProps } from './subject.types';

@Injectable()
export class SubjectFactory implements EntityFactory<Subject> {
  async create({ name, sec, credit, teachers }: SubjectProps): Promise<Subject> {
    const newSubject = new Subject(new mongoose.Types.ObjectId().toHexString(), name, sec, credit, teachers);
    return newSubject;
  }
}
