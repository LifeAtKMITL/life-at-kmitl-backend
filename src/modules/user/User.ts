import { AggregateRoot } from '@nestjs/cqrs';

export class User extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly userId: string,
    private readonly username: string,
    private readonly image: string,
    private readonly genedFaved: string[],
    private readonly subjectsLiked: string[],
    private readonly subjectsBookmarked: string[],
    private readonly dormsLiked: string[],
    private readonly dormsScored: string[],
    private readonly notesLiked: string[],
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
  getGenedFaved(): string[] {
    return this.genedFaved;
  }

  getSubjectsLiked(): string[] {
    return this.subjectsLiked;
  }

  getSubjectsBookmarked(): string[] {
    return this.subjectsBookmarked;
  }

  getDormsLiked(): string[] {
    return this.dormsLiked;
  }

  getDormsScored(): string[] {
    return this.dormsScored;
  }

  getNotesLiked(): string[] {
    return this.notesLiked;
  }
}
