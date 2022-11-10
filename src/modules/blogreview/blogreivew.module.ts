import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { BlogreviewCommandHandlers } from './commands';
import { BlogreviewEntityRepository } from './db/blogreview-entity.repository';
import { BlogreviewSchema } from './db/blogreview-schema';
import { BlogreviewSchemaFactory } from './db/blogreview-schema.factory';
import { BlogreviewController } from './blogreview.controller';
import { BlogreviewFactory } from './blogreview.factory';
import { BlogreviewQueryHandlers } from './queries';
import { BlogreviewDtoRepository } from './db/blogreview-dto.repository';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { SubjectFactory } from '../subject/subject.factory';
import { SubjectEntityRepository } from '../subject/db/subject-entity.repository';
import { SubjectSchemaFactory } from '../subject/db/subject-schema.factory';
import { SubjectDtoRepository } from '../subject/db/subject-dto.repository';
import { UserEntityRepository } from '../user/db/user-entity.repository';
import { UserSchemaFactory } from '../user/db/user-schema.factory';
import { GenEdSchema } from '../subject/db/gened-schema';
import { GenEdRepository } from '../subject/db/gened.repository';
import { GenEdSchemaFactory } from '../subject/db/gened-schema.factory';
import { SubjectDtoFactory } from '../subject/db/subject-dto.factory';
import { SubjectSchema } from '../subject/db/subject-schema';
import { userSchema, UserSchema } from '../user/db/user-schema';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: BlogreviewSchema.name, schema: SchemaFactory.createForClass(BlogreviewSchema) },
    ]),
    MongooseModule.forFeature([{ name: SubjectSchema.name, schema: SchemaFactory.createForClass(SubjectSchema) }]),
    MongooseModule.forFeature([{ name: UserSchema.name, schema: userSchema }]),
    MongooseModule.forFeature([{ name: GenEdSchema.name, schema: SchemaFactory.createForClass(GenEdSchema) }]),
    AuthModule,
    UserModule,
  ],
  controllers: [BlogreviewController],
  providers: [
    BlogreviewFactory,
    BlogreviewEntityRepository,
    BlogreviewSchemaFactory,

    ...BlogreviewCommandHandlers,
    ...BlogreviewQueryHandlers,
    BlogreviewDtoRepository,

    SubjectFactory,
    SubjectEntityRepository,
    SubjectSchemaFactory,
    SubjectDtoRepository,
    UserEntityRepository,
    UserSchemaFactory,
    GenEdSchema,
    GenEdRepository,
    GenEdSchemaFactory,
    SubjectDtoFactory,
  ],
})
export class BlogreviewModule {}
