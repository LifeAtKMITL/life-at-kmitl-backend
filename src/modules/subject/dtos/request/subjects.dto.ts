import mongoose from 'mongoose';

export class SubjectsDto {
  readonly _id: mongoose.Types.ObjectId;
  readonly name: string;
  readonly sec: string;
  readonly credit: number;
  readonly teachers: string[];
}
