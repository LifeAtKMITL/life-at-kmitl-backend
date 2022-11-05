import { ObjectId } from "mongoose";

export class BlogreviewDto {
    readonly subjectID: string;
    readonly textSubjectReview: string;
    readonly userID: string;
    readonly userName: string;
    readonly userID_Liked: string[];
    readonly rate: number;
    readonly date: Date;
  }