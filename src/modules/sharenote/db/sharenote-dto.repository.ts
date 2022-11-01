import { SharenoteSchema } from './sharenote-schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { SharenotesDto } from '../dtos/sharenotes.dto';
@Injectable()
export class SharenoteDtoRepository{
    constructor(
        @InjectModel(SharenoteSchema.name)
        private readonly sharenoteModel:Model<SharenoteSchema>,
    ){}
    async findAll(): Promise<SharenotesDto[]>{
        const sharenotes = await this.sharenoteModel.find({}, {}, { lean: true });
        return sharenotes.map((sharenote) => {
            return {
              userName: sharenote.userName,
              userId: sharenote.userId,
            };
          });
    }
}