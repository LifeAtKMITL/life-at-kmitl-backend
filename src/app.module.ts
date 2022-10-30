import { FirebaseModule } from './firebase/firebase.module';

import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SubjectModule } from './modules/subject/subject.module';
import { SharenoteModule } from './modules/sharenote/sharenote.module';

@Module({
  imports: [DatabaseModule, SubjectModule, SharenoteModule],
})
export class AppModule {}
