import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { EntityFactory } from 'src/ddd/EntityFactory';
import { DormEntityRepository } from './db/dorm-entity.repository';
import { Dorm } from './Dorm';
import { DormProps } from './dorm.types';

@Injectable()
export class DormFactory implements EntityFactory<Dorm> {
  constructor(private readonly dormEntityRepository: DormEntityRepository) {}

  async create({ name, description }: DormProps): Promise<Dorm> {
    const newDorm = new Dorm(new mongoose.Types.ObjectId().toHexString(), name, description);
    await this.dormEntityRepository.create(newDorm);
    return newDorm;
  }
}
