import { DormsByFilterOptionsQueryHandler } from './dorms-by-filterOptions.query-handler ';
import { DormByIdQueryHandler } from './dorm-by-id.query-handler';
import { DormsQueryHandler } from './dorms.query-handler';

export const DormQueryHandlers = [DormsQueryHandler, DormByIdQueryHandler, DormsByFilterOptionsQueryHandler];
