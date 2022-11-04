export class GetUserByIdDto {
  readonly userId: string;
  readonly username: string;
  readonly image: string;
  readonly genedFaved: string[];
  readonly subjectsLiked: string[];
  readonly subjectsBookmarked: string[];
  readonly dormsLiked: string[];
  readonly dormsScored: string[];
  readonly notesLiked: string[];
}
