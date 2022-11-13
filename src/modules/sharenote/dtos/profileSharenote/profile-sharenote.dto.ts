import { LikedNote } from './../../../user/value-objects';
import { Sharenote } from './../../Sharenote';
import { User } from 'src/modules/user/User';
export class ProfileSharenoteDto {
  readonly _id: string;
  readonly userId: string;
  readonly username: string;
  readonly image: string;
  readonly likedNotes: LikedNote[];
  readonly sharenotes: Sharenote[];
  readonly collectionCount: number;
  readonly totalViewCount: number;
  readonly likeCount: number;
}
