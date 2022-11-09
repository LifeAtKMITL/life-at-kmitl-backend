import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { EntitySchemaFactory } from 'src/database/entity-schema.factory';
import { Subject } from '../Subject';
import { SubjectSchema } from './subject-schema';

@Injectable()
export class SubjectSchemaFactory implements EntitySchemaFactory<SubjectSchema, Subject> {
  create(subject: Subject): SubjectSchema {
    return {
      _id: new mongoose.Types.ObjectId(subject.getId()),
      subjectId: subject.getSubjectId(),
      name: subject.getName(),
      classDateTime: subject.getClassDateTime(),
      midtermDateTime: subject.getMidtermDateTime(),
      finalDateTime: subject.getFinalDateTime(),
      sec: subject.getSec(),
      secPair: subject.getSecPair(),
      lectOrPrac: subject.getLectOrPrac(),
      credit: subject.getCredit(),
      teachers: subject.getTeachers(),
    };
  }

  createFromSchema(subjectSchema: SubjectSchema): Subject {
    return new Subject(
      subjectSchema._id.toString(),
      subjectSchema.subjectId,
      subjectSchema.name,
      subjectSchema.classDateTime,
      subjectSchema.midtermDateTime,
      subjectSchema.finalDateTime,
      subjectSchema.sec,
      subjectSchema.secPair,
      subjectSchema.lectOrPrac,
      subjectSchema.credit,
      subjectSchema.teachers,
    );
  }
}
