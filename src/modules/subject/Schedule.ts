import { Subject } from './Subject';

export class Schedule {
  constructor(private readonly subject: Subject) {}

  getSubject() {
    return this.subject;
  }
}
