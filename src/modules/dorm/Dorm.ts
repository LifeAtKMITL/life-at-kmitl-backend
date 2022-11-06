import { Totalscore } from './db/totalscore-schema';
import { AddScoreDto } from './dtos/command/add-score-dorm.dto';
import { AggregateRoot } from '@nestjs/cqrs';

export class Dorm extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly name: string,
    private readonly tel: string,
    private readonly address: string,
    private readonly room: any[],
    private readonly imagePath: string[],
    private readonly zone: string[],
    private readonly bills: any,
    private readonly facilities: any[],
    private totalScore: Totalscore[],
    private readonly rangePrice: number[],
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  getName(): string {
    return this.name;
  }

  getTel(): string {
    return this.tel;
  }

  getAddress(): string {
    return this.address;
  }
  getRoom(): any[] {
    return this.room;
  }

  getImagePath(): string[] {
    return this.imagePath;
  }

  getZone(): string[] {
    return this.zone;
  }
  getBills(): any {
    return this.bills;
  }
  getFacilities(): any[] {
    return this.facilities;
  }
  getTotalScore(): Totalscore[] {
    return this.totalScore;
  }

  setTotalScore(userId, score): any {
    // let listTotalScore = this.getTotalScore();

    for (let i = 0; i < this.totalScore.length; i++) {
      if (userId == this.totalScore[i].userID) {
        this.totalScore[i].score = score;
        return;
      }
    }
    this.addScore(userId, score);
  }

  getAvgScore(): number {
    let sum = 0;
    for (let i = 0; i < this.totalScore.length; i++) {
      sum = sum + this.totalScore[i].score;
    }
    if (sum != 0) {
      return sum / this.totalScore.length;
    }
    return 0;
  }

  getRangePrice(): number[] {
    return this.rangePrice;
  }
  addScore(userId: string, score: number): void {
    this.totalScore.push({ userID: userId, score: score } as Totalscore);
  }
}
