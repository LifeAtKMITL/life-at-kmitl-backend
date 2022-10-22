import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SubjectModule } from './modules/subject/subject.module';

@Module({
  imports: [DatabaseModule, SubjectModule],
})
export class AppModule {}
