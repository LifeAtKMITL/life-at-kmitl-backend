import { FirebaseModule } from './../../firebase/firebase.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { SharenoteCommandHandlers } from './commands';
import { SharenoteEntityRepository } from './db/sharenote-entity.repository';
import { SharenoteSchema } from './db/sharenote-schema';
import { SharenoteSchemaFactory } from './db/sharenote-schema.factory';
import { SharenoteController } from './sharenote.controller';
import { SharenoteFactory } from './sharenote.factory';
import { FileService } from 'src/firebase/services/file.service';
import { FirebaseService } from 'src/firebase/services/firebase.service';
import { SharenotesQueryhandlers } from './queries';
import { SharenoteDtoRepository } from './db/sharenote-dto.repository';
import { SubjectByIdQueryHandler } from './queries/sharenoteById.handler';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { UserEntityRepository } from '../user/db/user-entity.repository';
import { UserSchemaFactory } from '../user/db/user-schema.factory';
import { userSchema, UserSchema } from '../user/db/user-schema';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: SharenoteSchema.name, schema: SchemaFactory.createForClass(SharenoteSchema) }]),
    MongooseModule.forFeature([{ name: UserSchema.name, schema: userSchema }]),
    FirebaseModule,
    AuthModule,
    UserModule,
  ],
  controllers: [SharenoteController],
  providers: [
    SharenoteFactory,
    SharenoteEntityRepository,
    SharenoteSchemaFactory,
    SharenoteDtoRepository,
    UserEntityRepository,
    UserSchemaFactory,
    ...SharenoteCommandHandlers,
    ...SharenotesQueryhandlers,
    SubjectByIdQueryHandler,
  ],
})
export class SharenoteModule {}
