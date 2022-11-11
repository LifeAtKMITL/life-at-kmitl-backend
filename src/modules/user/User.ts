import { LikeSharenoteDto } from './../sharenote/dtos/likeSharenote/likeSharenote.dto';
import { AggregateRoot } from '@nestjs/cqrs';
import { AddFavoriteSubjectRequest } from './dtos/add-favorite-subject.dto';
import { BookmarkedReview, FavoriteGenEd, LikedDorm, LikedNote, LikedReview, ScoredDorm } from './value-objects';

export class User extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly userId: string,
    private readonly username: string,
    private readonly image: string,
    private favGenEds: FavoriteGenEd[],
    private likedReviews: LikedReview[],
    private bookmarkedReviews: BookmarkedReview[],
    private likedDorms: LikedDorm[],
    private scoredDorms: ScoredDorm[],
    private likedNotes: LikedNote[],
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  getUserId(): string {
    return this.userId;
  }

  getUsername(): string {
    return this.username;
  }

  getImage(): string {
    return this.image;
  }

  getFavGenEd(): FavoriteGenEd[] {
    return this.favGenEds;
  }

  getLikedReviews(): LikedReview[] {
    return this.likedReviews;
  }

  getBookmarkedReviews(): BookmarkedReview[] {
    return this.bookmarkedReviews;
  }

  getLikedDorms(): LikedDorm[] {
    return this.likedDorms;
  }

  getScoredDorms(): ScoredDorm[] {
    return this.scoredDorms;
  }

  getLikedNotes(): LikedNote[] {
    return this.likedNotes;
  }

  addFavoriteSubject(addFavoriteSubjectRequest: AddFavoriteSubjectRequest): void {
    this.favGenEds.push(addFavoriteSubjectRequest);
  }

  setLikedNotes(likeSharenoteDto: LikeSharenoteDto): boolean {
    let founded = false;
    this.likedNotes.forEach((element, index) => {
      if (likeSharenoteDto.sharenoteId == <string>(<unknown>this.likedNotes[index])) {
        this.likedNotes.splice(index, 1);
        founded = true;
      }
    });
    if (founded) {
      return false;
    }

    this.likeSharenote(likeSharenoteDto);
    return true;
  }

  likeSharenote(likeSharenoteDto: LikeSharenoteDto): void {
    const temp = <LikedNote>(<unknown>likeSharenoteDto.sharenoteId);
    this.likedNotes.push(temp);
  }
}
