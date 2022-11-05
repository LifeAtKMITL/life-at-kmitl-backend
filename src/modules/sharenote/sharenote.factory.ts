import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { EntityFactory } from 'src/ddd/EntityFactory';
import { SharenoteEntityRepository } from './db/sharenote-entity.repository';
import { Sharenote } from './Sharenote';
import { SharenoteProps } from './sharenote.types';

@Injectable()
export class SharenoteFactory implements EntityFactory<Sharenote> {
  constructor(private readonly sharenoteEntityRepository: SharenoteEntityRepository) {}

  async create(
    userId,
    userName,
    sharenoteCollectionName,
    sharenoteCollectionNameVersion,
    files,
    teachers,
  ): Promise<Sharenote> {
    const newSharenote = new Sharenote(
      new mongoose.Types.ObjectId().toHexString(),
      userId,
      userName,
      sharenoteCollectionName,
      sharenoteCollectionNameVersion,
      files,
      0,
      0,
      teachers,
      new Date(),
    );
    await this.sharenoteEntityRepository.create(newSharenote);
    return newSharenote;
  }
}
