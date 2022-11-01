import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SubjectModule } from './modules/subject/subject.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [DatabaseModule, SubjectModule, AuthModule],
})
export class AppModule {}
