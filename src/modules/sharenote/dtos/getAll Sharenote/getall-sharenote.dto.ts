import { Sharenote } from '../../Sharenote';

export class GetAllSharenoteDto {
  readonly userId: string;
  readonly username: string;
  readonly sharenotes: Sharenote;
}
