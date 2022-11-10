import { LikeSharenoteDto } from './../sharenote/dtos/likeSharenote/likeSharenote.dto';
import { AggregateRoot } from '@nestjs/cqrs';
import { AddFavoriteSubjectRequest } from '../subject/dtos/request/add-favorite-subject.dto';
import { BookmarkedReview, FavoriteGenEd, LikedDorm, LikedNote, LikedReview, ScoredDorm } from './value-objects';
import { AddBookmarkBlogreviewRequest } from '../blogreview/dtos/request/add-bookmark-blogreview.dto';

export class User extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly userId: string,
    private readonly username: string,
    private readonly image: string,
    private readonly favGenEds: FavoriteGenEd[],
    private readonly likedReviews: LikedReview[],
    private readonly bookmarkedReviews: BookmarkedReview[],
    private readonly likedDorms: LikedDorm[],
    private readonly scoredDorms: ScoredDorm[],
    private readonly likedNotes: LikedNote[],
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

  addFavoriteSubject(addFavoriteSubject: AddFavoriteSubjectRequest): void {
    this.favGenEds.push(addFavoriteSubject);
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

  addBookmarkBlogreview(addBookmarkBlogreview: AddBookmarkBlogreviewRequest): void {
    this.bookmarkedReviews.push(addBookmarkBlogreview);
  }
}
