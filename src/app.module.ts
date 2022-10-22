import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SubjectModule } from './modules/subject/subject.module';
import { DormModule } from './modules/dorm/dorm.module';

@Module({
  imports: [DatabaseModule, SubjectModule, DormModule],
})
export class AppModule {}
