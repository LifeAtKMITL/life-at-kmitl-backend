import { FileService } from './services/file.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseService } from './services/firebase.service';
import { FirebaseController } from './firebase.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [FirebaseService, FileService],
  controllers: [FirebaseController],
})
export class FirebaseModule {}
