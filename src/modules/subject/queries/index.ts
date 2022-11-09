import { FilterSubjectQueryHandler } from './filter-subect.query-handler';
import { SubjectByIdQueryHandler } from './subject-by-id.query-handler';
import { SubjectsQueryHandler } from './subjects.query-handler';

export const SubjectQueryHandlers = [SubjectsQueryHandler, SubjectByIdQueryHandler, FilterSubjectQueryHandler];
