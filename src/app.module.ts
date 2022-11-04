import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SubjectModule } from './modules/subject/subject.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    SubjectModule,
    AuthModule,
    ProductModule,
    UserModule,
  ],
})
export class AppModule {}
