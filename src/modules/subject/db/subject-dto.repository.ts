import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubjectDto } from '../dtos/subject.dto';
import { SubjectsDto } from '../dtos/subjects.dto';
import { GenEdSchema } from './gened-schema';
import { GenEdSchemaFactory } from './gened-schema.factory';
import { SubjectSchema } from './subject-schema';
import { SubjectSchemaFactory } from './subject-schema.factory';

@Injectable()
export class SubjectDtoRepository {
  constructor(
    @InjectModel(SubjectSchema.name) private readonly subjectModel: Model<SubjectSchema>,
    @InjectModel(GenEdSchema.name) private readonly genedModel: Model<GenEdSchema>,
    private readonly subjectShemaFactory: SubjectSchemaFactory,
    private readonly genedSchemaFactory: GenEdSchemaFactory,
  ) {}

  // DESC: find all subjects in Subject collection
  async findAll(): Promise<SubjectsDto[]> {
    const subjects = await this.subjectModel.find({}, {}, { lean: true });
    return subjects.map((subject) => {
      return {
        subjectId: subject.subjectId,
        name: subject.name,
      };
    });
  }

  // DESC: Filter Subject Collection by subjectId
  async findById(id: string): Promise<SubjectDto[]> {
    const subjects = await this.subjectModel.find({ subjectId: id }, {}, { lean: true });
    const genEds = await this.genedModel.find({ subjectId: id }, {}, { lean: true });

    const subjectE = subjects.map((sub) => this.subjectShemaFactory.createFromSchema(sub));
    const subjectFromGenEd = genEds.map((subject) => this.genedSchemaFactory.createFromSchema(subject));

    // made this better
    return [...subjectE, ...subjectFromGenEd].map((subject) => {
      return {
        subjectId: subject.getSubjectId(),
        name: subject.getName(),
        sec: subject.getSec(),
        classDateTime: subject.getClassDateTime(),
        midtermDateTime: subject.getMidtermDateTime(),
        finalDateTime: subject.getFinalDateTime(),
        credit: subject.getCredit(),
        teachers: subject.getTeachers(),
        classDateTime_v: subject.classDateTimeToString(),
        midtermDateTime_v: subject.examDateTimeToString(subject.getMidtermDateTime()),
        finalDateTime_v: subject.examDateTimeToString(subject.getFinalDateTime()),
      };
    });
  }
}
