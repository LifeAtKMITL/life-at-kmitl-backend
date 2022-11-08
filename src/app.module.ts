import { DormModule } from './modules/dorm/dorm.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SubjectModule } from './modules/subject/subject.module';
import { SharenoteModule } from './modules/sharenote/sharenote.module';

import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { BlogreviewModule } from './modules/blogreview/blogreivew.module';

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
    BlogreviewModule,
    SharenoteModule,
  ],
})
export class AppModule {}
