import { AggregateRoot } from '@nestjs/cqrs';
import { BookmarkedReview, FavoriteGenEd, LikedDorm, LikedNote, LikedReview, ScoredDorm } from './value-objects';

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
}
