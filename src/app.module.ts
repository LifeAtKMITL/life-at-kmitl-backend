import { DormModule } from './modules/dorm/dorm.module';
import { FirebaseModule } from './firebase/firebase.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SubjectModule } from './modules/subject/subject.module';
import { SharenoteModule } from './modules/sharenote/sharenote.module';

import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { FilesModule } from './modules/file-module/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    SubjectModule,
    DormModule,
    AuthModule,
    ProductModule,
    UserModule,
    SharenoteModule,
    FilesModule,
    FirebaseModule,
  ],
})
export class AppModule {}
