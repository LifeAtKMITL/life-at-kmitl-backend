import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SubjectModule } from './modules/subject/subject.module';
import { BlogreviewModule } from './modules/blogreview/blogreivew.module';

@Module({
  imports: [DatabaseModule, SubjectModule, BlogreviewModule],
})
export class AppModule {}
