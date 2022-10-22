import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@life-at-kmitl-cluster.svvzfuy.mongodb.net/life-at-kmitl-db`,
    ),
  ],
})
export class DatabaseModule {}
