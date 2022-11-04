// DESC: using for api: get /subject
export class DormsDto {
  readonly dormId: string;
  readonly name: string;
  readonly tel: string;
  readonly address: string;
  readonly room: object[];
  readonly imagePath: string[];
  readonly zone: string;
  readonly bills: object;
  readonly facilities: object;
  readonly totalScore: object[];
}
