import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { EntitySchemaFactory } from 'src/database/entity-schema.factory';
import { Subject } from '../Subject';
import { GenEdSchema } from './gened-schema';

@Injectable()
export class GenEdSchemaFactory implements EntitySchemaFactory<GenEdSchema, Subject> {
  create(subject: Subject): GenEdSchema {
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

  createFromSchema(subjectSchema: GenEdSchema): Subject {
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
