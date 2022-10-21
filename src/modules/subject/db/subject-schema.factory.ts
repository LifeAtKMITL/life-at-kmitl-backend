import mongoose from 'mongoose';
import { EntitySchemaFactory } from 'src/database/entity-schema.factory';
import { Subject } from '../Subject';
import { SubjectSchema } from './subject-schema';

export class SubjectSchemaFactory implements EntitySchemaFactory<SubjectSchema, Subject> {
  create(subject: Subject): SubjectSchema {
    return {
      _id: new mongoose.Types.ObjectId(subject.getId()),
      name: subject.getName(),
      sec: subject.getSec(),
      credit: subject.getCredit(),
      teachers: subject.getTeachers(),
    };
  }

  createFromScehma(subjectSchema: SubjectSchema): Subject {
    return new Subject(
      subjectSchema._id.toString(),
      subjectSchema.name,
      subjectSchema.sec,
      subjectSchema.credit,
      subjectSchema.teachers,
    );
  }
}
